import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'pinia-state',
    state: () => ({
        // user: JSON.parse(window.localStorage.getItem('user-info')) || null,
        user: JSON.parse(sessionStorage.getItem('user')) || null,
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