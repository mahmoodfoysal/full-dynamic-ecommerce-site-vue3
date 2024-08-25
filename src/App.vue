<script setup>
import NavBar from '../src/components/shared/NavBar/Navbar.vue';
import Footer from '../src/components/shared/Footer/Footer.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from './stores/TaskStore';
import MobileMenu from '../src/components/shared/MobileMenu/MobileMenu.vue';

const store = useStore();

const searchData = ref('');

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            store.setUser(user);
        } else {
        }
    });
});

// all search code write here 
const handleSearch = (search) => {
    searchData.value = search;
};

</script>

<template>
    <!-- All home section are set here  -->
    <div class="home-section-style">
        <NavBar 
        @search-products="handleSearch"
        ></NavBar>
        <!-- search for mobile menu  -->
        <div class="d-flex justify-content-center">
            <form class="d-flex search-field-style" role="search">
                <input 
                v-model="searchData" 
                class="form-control me-2" 
                type="search" 
                placeholder="Search"
                aria-label="Search">
                <button class="btn" type="submit">
                    <span class="material-icons">
                        search
                    </span>
                </button>
            </form>
        </div>
        <RouterView 
        :searchData="searchData">
        </RouterView>
        <button @click="scrollToTop" class="top-scroll-btn">
            <span class="material-icons">
                expand_less
            </span></button>
        <Footer></Footer>
        <MobileMenu></MobileMenu>
    </div>
</template>

<style scoped>
/* .home-section-style{
    min-width: 993px;
    margin: auto;
    height: calc(100vh - 0px);
    background: #FFF;
    overflow-y: scroll;
}

@media screen and (max-width: 992px) {
  .home-section-style{
    margin: auto;
    height: calc(100vh - 0px);
    background: #FFF;
    overflow-y: scroll;
}
} */


.top-scroll-btn {
    position: fixed;
    bottom: 45px;
    left: 19px;
    border-radius: 20px;
    font-size: 26px;
    width: 48px;
    z-index: 1000;
    background: #FFF;
    color: #1F5DA0;
    border: 2px solid #1F5DA0;
}

.top-scroll-btn:hover {
    background: #1F5DA0;
    border: 2px solid #FFF;
    color: #FFF;
}

.search-field-style {
    position: fixed;
    top: 80px;
    z-index: 200;
}

.search-field-style button {
    width: 55px;
    height: 35px;
    background: #1F5DA0;
    border: none;
    position: absolute;
    right: 10px;
    top: 4px;
}

.search-field-style button span {
    color: #FFFFFF;
}

.search-field-style input {
    width: 400px;
    height: 100%;
    background: white;
    /* border: 3px solid #1F5DA0; */
    border: 1px solid white;
    font-family: 'Poppins', sans-serif;
    font-weight: 500px;
    color: black;
}

@media only screen and (max-width: 2560px) {
    .search-field-style {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .search-field-style {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .search-field-style {
        display: none;
    }
}

@media only screen and (max-width: 1024px) {
    .search-field-style {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .search-field-style {
        position: fixed;
        top: 16px;
        z-index: 1021;
        display: block;
    }

    .search-field-style button {
        width: 55px;
        height: 35px;
        background: #1F5DA0;
        border: none;
        position: absolute;
        right: 10px;
        top: 2px;
    }

    .search-field-style button span {
        color: #FFFFFF;
    }

    .search-field-style input {
        width: 400px;
        height: 100%;
        background: white;
        /* border: 3px solid #1F5DA0; */
        border: 1px solid white;
        font-family: 'Poppins', sans-serif;
        font-weight: 500px;
        color: black;
    }
}

@media only screen and (max-width: 540px) {
    .search-field-style {
        position: fixed;
        top: 20px;
        z-index: 1021;
        display: block;
        margin-left: 8px;
    }

    .search-field-style button {
        width: 44px;
        height: 100%;
        background: gray;
        border: none;
        position: absolute;
        right: 8px;
        top: 0px;
        display: none;
    }

    .search-field-style button span {
        color: #FFFFFF;
    }

    .search-field-style input {
        width: 140px;
        height: 33px;
        background: white;
        border: 1px solid #1F5DA0;
        font-family: 'Poppins', sans-serif;
        font-weight: 500px;
        color: black;
    }
}
</style>
