import { defineStore } from 'pinia';
import { Categories } from '../api/repositories';

export const useCategoriesStore = defineStore('CategoriesStore', {
  state: () => ({
    categories: [],
  }),
  getters: {
    getCategoryById() {
      return (id) => this.categories.filter((category) => category.id === id);
    },
    getCategoryIDByName() {
      return (categoryName) => {
        return this.categories.find((cat) =>
          cat.name.toLowerCase() === categoryName.toLowerCase()
        )?.id;
      };
    },
  },
  actions: {
    async readCategory() {
      try {
        this.categories = await Categories.readAll();
      } catch (error) {
        throw error;
      }
    },
    async readCategoryByID(id) {
      try {
        this.categories = await Categories.readById(id);
      } catch (error) {
        throw error;
      }
    },
  },
});
