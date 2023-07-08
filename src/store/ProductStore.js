import { defineStore } from 'pinia';
import { Product } from '../api/repositories';
import { useCategoriesStore } from './CategoriesStore';


export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    product: [],
    
  }),
  getters: {
    getItemsByCategory() {
      return (id) => this.products.filter((product) => product.category_id === id);
    },
    getItemById() {
      return (id) => this.products.find((product) => product.category_id === id);
    },
    getProductsByCategoryID() {
      return (categoryID) => {
        return this.products.filter((prod) => prod.category_id === categoryID);
      };
    },
    getCategoryIDByName: () => {
      const categoriesStore = useCategoriesStore();
      return (categoryName) => {
        return categoriesStore.getCategoryIDByName(categoryName);
      };
    },
    getProductsByCategoryID: () => {
      const productStore = useProductStore();
      return (categoryID) => {
        return productStore.getItemsByCategory(categoryID);
      };
    },
  },
  actions: {
    async fetchItems() {
      try {
        this.products = await Product.readAll();
      } catch (error) {
        throw error;
      }
    },
    async fetchID(id) {
      try {
        this.product = await Product.readById(id);
      } catch (error) {
        throw error;
      }
    },
    addItem(item) {
      this.products.push(item);
    },
    async addProduct(data) {
      try {
        const newProduct = await Product.create(data);
        this.products.push(newProduct);
      } catch (error) {
        throw error;
      }
    },
    
  }  
});
