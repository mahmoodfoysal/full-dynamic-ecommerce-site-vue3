<script setup>
import { onMounted } from 'vue';
import getDataFromCentralApiFile from '/src/API/All_API.js';

const {GetCatImg, catImgData} = getDataFromCentralApiFile();

onMounted(GetCatImg)

</script>

<template>
    <div class="image-category-style">
        <div class="row g-4">
            <div v-for="(item, index) in catImgData" :key="index" class = "col-lg-6 col-md-6 col-sm-12">
                <img class="image-style" :src="item.img">
            </div>

        </div>
    </div>
</template>

<style scoped>
.image-category-style {
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}

.image-style {
    width: 100%;
    height: 70vh;
    object-fit: cover;
}
</style>