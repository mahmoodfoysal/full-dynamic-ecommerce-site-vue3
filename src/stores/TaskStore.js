import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'pinia-state',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user-info')) || null,
        cartItem: JSON.parse(localStorage.getItem('shopping_cart')) || [],
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        setCartItem(data) {
            this.cartItem = data;
        },
    },
    getters: {

    }
})