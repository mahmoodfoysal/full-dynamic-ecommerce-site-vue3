<script setup>
import { onMounted } from 'vue';
import getDataFromCentralApiFile from '/src/API/All_API.js';

const { GetCatImg, catImgData } = getDataFromCentralApiFile();

onMounted(async () => {
    await GetCatImg();
})

</script>

<template>
        <section v-if="catImgData.length === 0" class="d-flex justify-content-center mb-5 mt-5" role="status">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </section>
    <section v-else class="image-category-style container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-1 g-4">
            <div v-for="(item, index) in catImgData" :key="index" class="col">
                <img class="image-style" :src="item.img" alt="">
            </div>

        </div>
    </section>
</template>

<style scoped>
.image-category-style {
    margin-top: 30px;
}

.image-style {
    width: 100%;
    height: 70vh;
    object-fit: cover;
}

@media only screen and (max-width: 540px) {
    .image-style {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

@media only screen and (max-width: 1920px) {
    .image-category-style {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1440px) {
    .image-category-style {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1024px) {
    .image-category-style {
        max-width: 950px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 768px) {
    .image-category-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 540px) {
    .image-category-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
</style>