<script setup>
import { GetCatImg } from '@/API/All_API.js';
import { ref, onMounted } from 'vue';

const categoryImgList = ref([]);

onMounted(() => {
    handleGetCatImg();
});

const handleGetCatImg = async () => {
    try {
        const result = await GetCatImg();
        const allCatImages = result?.data;
        const getRandomItems = (array, count) => {
              const shuffled = array.slice(0);
              let i = array.length;
              let temp, index;
              while (i--) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[i];
                shuffled[i] = shuffled[index];
                shuffled[index] = temp;
              }
              return shuffled.slice(0, count);
            };
            const randomCatImages = getRandomItems(allCatImages, 4);
            categoryImgList.value = randomCatImages
          }
    catch(error) {
        console.log("Category Image", error);
    }
};

</script>

<template>
        
    <section class="image-category-style container">
        <div 
        v-if="categoryImgList.length === 0"
        class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-1 g-4">
            <div v-for="n in 4" :key="n" class="placeholder-glow col">
                <span 
                style="padding: 230px;"
                class="placeholder col-12"></span>
            </div>

        </div>

        <div 
        v-else
        class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-1 g-4">
            <div v-for="(item, index) in categoryImgList" :key="index" class="col">
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
    cursor: pointer;
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