import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'pinia-state',
    state: () => ({
        // user: JSON.parse(window.localStorage.getItem('user-info')) || null,
        user: JSON.parse(sessionStorage.getItem('kitkat-user')) || null,
        cartItem: JSON.parse(localStorage.getItem('shopping_cart')) || [],
        buySingleItem: [],
        isAdmin: false
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        setCartItem(data) {
            this.cartItem = data;
        },
        setBuySingleProduct(data) {
            this.buySingleItem = data;
        },
        setAdmin(data) {
            this.isAdmin = data
        }
    },
    getters: {

    }
})