<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="mobile-menu-style container">
        <div class="mobile-menu-style d-flex justify-content-between align-items-center">
            <RouterLink :to="{name: 'Home'}" class="link-style">
                <h6>Home</h6>
            </RouterLink class="link-style">
                <h6>Categories</h6>
            <RouterLink :to="{name: 'Products'}" class="link-style">
                <h6>Products</h6>
            </RouterLink>
            <RouterLink :to="{name: 'Login'}" class="link-style">
                <h6>Login</h6>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0;
}

.mobile-menu-style {
    background-color: #1F5DA0;
    bottom: 0;
    height: 25px;
    width: 100%;
}

.mobile-menu-style h6 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    color: #FFFFFF;
    font-size: 15px;
}

.link-style {
    text-decoration: none;
}

@media only screen and (max-width: 2560px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .mobile-menu-style {
        width: 100% !important;
        margin: auto;
        display: block;
        position: sticky;
        z-index: 5;
    }
}

@media only screen and (max-width: 540px) {
    .mobile-menu-style {
        max-width: 100% !important;
        display: block;
        position: sticky;
        z-index: 5;
    }
}
</style>