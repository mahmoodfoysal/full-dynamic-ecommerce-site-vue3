<script setup>
import { toRefs } from 'vue';
import { RouterView } from 'vue-router';
import DashboardSideBar from './Features/DashboardSideBar/DashboardSideBar.vue';

const props = defineProps({
    searchData: {
        type: String,
        default: ''
    }
});

const {searchData} = toRefs(props)
</script>

<template>
    <section class="container container-style">

        <div class="row g-4">
            <!-- sidebar div  -->
            <div class="col-md-2">
                <div class="sidebar-style">
                    <DashboardSideBar></DashboardSideBar>
                </div>
            </div>
            <div class="col-md-10">
                <RouterView
                :searchData="searchData"
                ></RouterView>
            </div>
        </div>
    </section>
</template>

<style scoped>
h1, h2, h3, h4, h5,h6, p {
    margin: 0;
    padding: 0;
}

@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
</style>