import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'counter',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user-info')) || null,
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        }
    },
    getters: {

    }
})