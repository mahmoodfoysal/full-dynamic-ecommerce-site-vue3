<script setup>
import NavBar from '../src/components/shared/NavBar/Navbar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

</script>

<template>

<!-- All home section are set here  -->
<div class="home-section-style">
  <NavBar
  ></NavBar>
  <RouterView
  ></RouterView>
</div>
</template>

<style scoped>
.home-section-style{
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
}


</style>
