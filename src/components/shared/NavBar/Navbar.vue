<script setup>
import { ref, onMounted, computed } from 'vue';
import router from '../../../router/router'
import { RouterLink } from 'vue-router';
import { useStore } from '@/stores/TaskStore';
import getDataFromCentralApiFile from '../../../API/All_API.js';

// destructure get categpory api for mount 
const { getCategories, categories } = getDataFromCentralApiFile();

// mount the category items 
onMounted(async () => {
    await getCategories()
});

// declare a variable for using pinia store 
const store = useStore();

// declare a reactive variable for toggle category bar 
const showSidebar = ref(false);

// declare a variable user where store the localStorage data 
const user = ref(JSON.parse(window.localStorage.getItem('user-info')));

// event handler for log out and kill the session 
const handleLogout = () => {
    // remove item from the localStorage 
    localStorage.removeItem('user-info');
    store.setUser(null);
    if (user.value) {
        router.push({ name: 'Home' })
    }
}

// call a computed property for show cart how many cart items added 
const cartCount = computed(() => {
    return Object.values(store.cartItem).length || 0
})

</script>

<template>
    <!-- navbar code  -->

    <section class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-body-tertiary first-navbar-style">
            <div class="container-fluid">
                <RouterLink :to="{ name: 'Home' }" class="active-link">
                    <a style="text-decoration: none;" class="navbar-brand navbar-text" href="#">E-Commerce</a>
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink 
                            class="active-link"
                            :to="{name:'Home'}"><a class="nav-link navbar-text" aria-current="page" href="#">Home</a></RouterLink >
                        </li>
                        <li class="nav-item">
                            <RouterLink 
                            class="active-link"
                            :to="{name: 'Products'}"><a class="nav-link navbar-text" href="#">Products</a></RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle navbar-text" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu">
                                <ul>
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 1</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 2</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 3</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 4</a></li>
                                </ul>
                                <ul>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 1</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 2</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 3</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 4</a></li>
                                </ul>
                                <ul>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 1</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 2</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 3</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 4</a></li>
                                </ul>
                                <ul>
                                    <li><a class="dropdown-item" href="#">menu menu</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 1</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 2</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 3</a></li>
                                    <li><a class="dropdown-item" href="">Drop menu 4</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <!-- cart and wislist  -->
                    <div class="me-2 d-flex align-items-center">

                        <span class="material-icons me-3 icon-style">favorite</span>
                        <div class="fav-i-back">
                            <small>1</small>

                        </div>

                        <RouterLink
                        :to="{name: 'Cart'}"
                        >
                            <span class="material-icons me-3 icon-style">shopping_cart</span>
                        </RouterLink>
                        <div class="cart-i-back">
                            <small>{{ cartCount }}</small>
                        </div>

                        <span class="material-icons me-3 icon-style">person</span>

                        <div>

                        </div>


                        <span v-if="store.user === null" class="d-flex flex-column">
                            <RouterLink :to="{ name: 'Login' }" class="active-link"><small class="auth-text">Login</small></RouterLink>
                            <RouterLink :to="{ name: 'Registration' }" class="active-link"><small class="auth-text">Registration</small>
                            </RouterLink>
                        </span>
                        <span v-else class="d-flex flex-column">
                            <small @click="handleLogout" class="auth-text">Logout</small>

                        </span>
                    </div>
                </div>
            </div>
        </nav>
        <!-- second-narbar  -->

        <nav class="navbar bg-body-tertiary second-navbar-style">
            <div class="container-fluid">
                <div class="d-flex ms-2 align-items-center" @mouseover="showSidebar = true" @mouseout="showSidebar = false">
                    <span class="material-icons toggle-btn-style">menu</span>
                    <h6 class="ms-2 navbar-text">Shop By Category</h6>
                </div>
                <form class="d-flex search-field-style" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn" type="submit"><span class="material-icons">
                            search
                        </span></button>
                </form>
                <h6 class="navbar-text" href="#">Shop Address</h6>
            </div>
        </nav>
    </section>


    <!-- nested sidebar  -->
    <div>
        <nav 
        @mouseover="showSidebar = true"
        @mouseout="showSidebar = false"
        :class="{'d-none': !showSidebar, 'd-block': showSidebar}" class="sidebar-style">
            <ul>
                <li v-for="(parentCat, index) in categories" :key="index" class="dropdown">
                    <RouterLink
                        :to="{ name: 'CategoryProducts', params: { id: parentCat.parent_cat_id, slug: parentCat.parent_cat_name.replace(/\s+/g, '-') } }">
                        <a href="">
                            {{ parentCat.parent_cat_name }}<span>&rsaquo;</span>
                        </a>
                    </RouterLink>
                    <ul>
                        <li v-for="(subCat, index) in parentCat.sub_cat_info" :key="index" class="dropdown-2">
                            <RouterLink
                                :to="{ name: 'CategoryProducts', params: { id: subCat.sub_cat_id, slug: subCat.sub_cat_name.replace(/\s+/g, '-') } }">
                                <a href="">
                                    {{ subCat.sub_cat_name }}<span>&rsaquo;</span>
                                </a>
                            </RouterLink>
                            <ul>
                                <li v-for="(subSubCat, index) in subCat.sub_sub_cat_info" :key="index" class="dropdown-3">
                                    <RouterLink
                                        :to="{ name: 'CategoryProducts', params: { id: subSubCat.sub_sub_cat_id, slug: subSubCat.sub_sub_cat_name.replace(/\s+/g, '-') } }">
                                        <a href="">
                                            {{ subSubCat.sub_sub_cat_name }} <span>&rsaquo;</span>
                                        </a>
                                    </RouterLink>
                                    <ul>
                                        <li v-for="(subSubSubCat, index) in subSubCat.sub_sub_sub_cat_info" :key="index"
                                            class="dropdown-4">
                                            <RouterLink
                                                :to="{ name: 'CategoryProducts', params: { id: subSubSubCat.sub_sub_sub_cat_id, slug: subSubSubCat.sub_sub_sub_cat_name.replace(/\s+/g, '-') } }">
                                                <a href="">
                                                    {{ subSubSubCat.sub_sub_sub_cat_name }}
                                                </a>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>
    </div>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
    padding: 0;
}


.toogle-style {
    cursor: pointer;
}

.first-navbar-style {
    background-color: #1F5DA0 !important;
    height: 72px !important;
}

.second-navbar-style {
    background-color: #1F5DA0 !important;
    border-top: 1.5px solid #1A4F88;
}

.navbar-text {
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    letter-spacing: 1.5px;
    cursor: pointer;
}

.auth-text {
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    letter-spacing: 1.5px;
    cursor: pointer;
    text-decoration: none
}

.toggle-btn-style {
    color: #FFFFFF;
    border: 0;
    cursor: pointer;
}

.icon-style {
    color: #FFFFFF;
    font-size: 39px;
    cursor: pointer;
}

.search-field-style {
    position: relative;
}

.search-field-style button {
    width: 55px;
    height: 33px;
    background: #929292;
    border: none;
    position: absolute;
    right: 10px;
    top: 1px;
}

.search-field-style button span {
    color: #FFFFFF;
}

.search-field-style input {
    width: 480px;
    height: 100%;
}

.sidebar-style {
    width: 250px;
    position: fixed;
    top: 125px;
    left: 23px;
    background: #FFF;
    z-index: 1030;
}

.sidebar-style ul {
    position: relative;
    list-style-type: none;
    height: 442px;
    padding: 0;
    margin: 0;
}


.sidebar-style ul li a {
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    padding-left: 10px;
    letter-spacing: 1px;
    font-weight: 400;
    height: 35px;
    transition: .5s ease;
}

.sidebar-style ul li a:hover {
    background: rgb(231, 227, 227);
    /* color: white; */
}

.sidebar-style ul ul li a {
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    padding-left: 10px;
    /* letter-spacing: 1px; */
    font-weight: 400;
    height: 35px;
    transition: .5s ease;
}

.sidebar-style ul ul {
    /* position: absolute;
    left: 250px;
    width: 200px; */
    position: fixed;
    left: 273px;
    width: 200px;
    top: 126px;
    background-color: #FFF;
    width: 265px;
    height: 397px;
    display: none;
    /* box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); */

}

.sidebar-style ul span {
    position: absolute;
    right: 20px;
    font-size: 1.5em;
}

.sidebar-style ul .dropdown {
    position: relative;
}

.sidebar-style ul .dropdown:hover>ul {
    display: initial;
}

.sidebar-style ul .dropdown-2 ul {
    position: absolute;
    left: 265px;
    top: 3px;
}

.sidebar-style ul .dropdown-2:hover>ul {
    display: initial;
}

.sidebar-style ul ul .dropdown-3 ul {
    position: absolute;
    left: 264px;
    top: 3px;
}

.sidebar-style ul ul .dropdown-3:hover ul {
    display: initial;
}


/* mega menu  */

.wrapper {
    position: relative;
    max-width: 1250px;
    padding: 0 30px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dropdown-menu {
    border: none;
    border-radius: 0;
    padding: .5em;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .23);
}

.dropdown-menu ul {
    list-style: none;
    padding: 0;
}

.dropdown-menu li a {
    color: gray;
    padding: 0.5em 1em;

}

.dropdown-menu li:first-child a {
    font-weight: bold;
    font-size: 1.2em;

}

/* media for mega menu  */
@media screen and (min-width: 993px) {
    .dropdown-menu.show {
        display: flex !important;
    }

    .dropdown:hover .dropdown-menu {
        display: flex !important;
    }
}

@media screen and (max-width: 992px) {
    .dropdown-menu.show {
        max-height: 60vh;
        overflow-y: scroll;
    }

    .search-field-style input {
        width: 100%;
    }

    .first-navbar-style {
        z-index: 5;
    }

}

.fav-i-back {
    position: relative;
    top: -15px;
    left: auto;
    bottom: auto;
    right: 26px;
    border-radius: 17px;
    background: #D71110;
    padding: 2px;
    height: 20px;
    margin: auto;
    width: 21px;
}

.fav-i-back small {
    position: absolute;
    color: white;
    left: 7px;
    bottom: 2px;
    font-size: 11px;
    z-index: 2;
    font-weight: bold;
}

.cart-i-back {
    position: relative;
    top: -15px;
    left: auto;
    bottom: auto;
    right: 25px;
    border-radius: 17px;
    background: #D71110;
    padding: 2px;
    height: 20px;
    margin: auto;
    width: 21px;
}

.cart-i-back small {
    position: absolute;
    color: white;
    left: 7px;
    bottom: 2px;
    font-size: 11px;
    z-index: 2;
    font-weight: bold;
}
.active-link {
    color: #D9946D !important;
    text-decoration: none;
}
</style>