<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';


const showSidebar = ref(false);

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
</script>

<template>
    <!-- navbar code  -->

    <section class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-body-tertiary first-navbar-style">
            <div class="container-fluid">
                <a class="navbar-brand navbar-text" href="#">E-Commerce</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link navbar-text" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link navbar-text" href="#">Products</a>
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

                        <span class="material-icons me-3 icon-style">shopping_cart</span>
                        <div class="cart-i-back">
                            <small>1</small>
                        </div>

                        <span class="material-icons me-3 icon-style">person</span>
                        <span class="d-flex flex-column">
                            <RouterLink :to="{name: 'Login'}"><small class="auth-text">Login</small></RouterLink>
                            <RouterLink :to="{name: 'Registration'}"><small class="auth-text">Registration</small></RouterLink>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
        <!-- second-narbar  -->

        <nav class="navbar bg-body-tertiary second-navbar-style">
            <div class="container-fluid">
                <div class="d-flex ms-2 align-items-center">
                    <span @mouseover="toggleSidebar" class="material-icons toggle-btn-style">menu</span>
                    <h6 @mouseover="toggleSidebar" class="ms-2 navbar-text">Shop By Category</h6>
                </div>
                <form class="d-flex search-field-style" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn" type="submit"><span class="material-icons">
                            search
                        </span></button>
                </form>
                <a class="navbar-brand navbar-text" href="#">Shop Address</a>
            </div>
        </nav>
    </section>




    <!-- nested sidebar  -->
    <div>
        <nav v-show="showSidebar" class="sidebar-style">
            <ul>
                <li v-for="n in 10" class="dropdown"><a href="">Parent Component<span>&rsaquo;</span></a>
                    <ul>
                        <li v-for="n in 5" class="dropdown-2"><a href="">Child-1 component <span>&rsaquo;</span></a>
                            <ul>
                                <li v-for="n in 4" class="dropdown-3"><a href="">Child-2 Component <span>&rsaquo;</span></a>
                                    <ul>
                                        <li v-for="n in 3" class="dropdown-4"><a href="">Child-3 Component</a></li>
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
    height: 87px !important;
}

.second-navbar-style {
    background-color: #1F5DA0 !important;
    border-top: 1.5px solid #1A4F88;
}

.navbar-text {
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
}

.auth-text {
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
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
    width: 59px;
    height: 35px;
    background: #929292;
    border: none;
    position: absolute;
    right: 9px;
    top: 2px;
}

.search-field-style button span {
    color: #FFFFFF;
}

.search-field-style input {
    width: 480px;
}

.sidebar-style {
    width: 250px;
    position: absolute;
    top: 130px;
    left: 23px;
    background: #FFF;
    z-index: 1030;
}

.sidebar-style ul {
    position: relative;
    list-style-type: none;
    padding: 0;
    margin: 0;
}


.sidebar-style ul li a {
    display: flex;
    align-items: center;
    font-family: Roboto;
    font-size: 1.15rem;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    padding-left: 10px;
    /* width: 215px; */
    height: 50px;
    transition: .5s ease;
}

.sidebar-style ul li a:hover {
    background: rgb(231, 227, 227);
    /* color: white; */
}

.sidebar-style ul ul {
    position: absolute;
    left: 250px;
    width: 200px;
    top: 5px;
    background-color: #FFF;
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
    left: 200px;
    top: 10px;
}

.sidebar-style ul .dropdown-2:hover>ul {
    display: initial;
}

.sidebar-style ul ul .dropdown-3 ul {
    position: absolute;
    left: 200px;
    top: 15px;
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
    left: 5px;
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
    left: 5px;
    bottom: 2px;
    font-size: 11px;
    z-index: 2;
    font-weight: bold;
}</style>