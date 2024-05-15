<script setup>
import NavBar from '../src/components/shared/NavBar/Navbar.vue';
import Footer from '../src/components/shared/Footer/Footer.vue';
import { RouterView } from 'vue-router';
import {onMounted} from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from './stores/TaskStore';
import MobileMenu from '../src/components/shared/MobileMenu/MobileMenu.vue';
const store = useStore();
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

</script>

<template>
<!-- All home section are set here  -->
<div class="home-section-style">
  <NavBar></NavBar>
  <RouterView></RouterView>
  <button 
    @click="scrollToTop"
    class="top-scroll-btn">
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


</style>
