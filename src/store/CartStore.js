import { defineStore } from 'pinia';
import { Cart } from '../api/repositories';

export const useCartStore = defineStore('CartStore', {
  state: () => ({
    cart: [],
  }),

  getters: {
    getCartItems: (state) => {
      return state.cart;
    },
    getCartNumber: (state) => {
      return state.cart.length;
    },
  },

  actions: {
    async readCart() {
      try {
        this.cart = await Cart.readAll();
      } catch (error) {
        throw error;
      }
    },

    async addToCart(product) {
      const existingCartItem = this.cart.find(item => item.product_id === product.id);
      if (existingCartItem) {
        
        existingCartItem.qty++;
        try {
          
          await Cart.update(existingCartItem.id, existingCartItem);
        } catch (error) {
          throw error;
        }
      } else {
        
        const cartItem = {
          product_id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          qty: 1,
          id: Math.random().toString(36).substr(2, 9),
        };
        try {
          await Cart.create(cartItem);
          this.cart.push(cartItem);
        } catch (error) {
          throw error;
        }
      }
    },
    async deleteItem(itemId) {
      try {
        await Cart.delete(itemId);
        this.cart = this.cart.filter(item => item.id !== itemId);
      } catch (error) {
        throw error;
      }
    },
  }  
});

