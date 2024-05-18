<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import getDataFromCentralApiFile from '@/API/All_API.js';
import { RouterLink } from 'vue-router';

const { getProducts, products } = getDataFromCentralApiFile();
// Mousewheel its work for mouse wheel sliding 
// import required modules
const modules = [Navigation, Pagination, Keyboard];

onMounted(async () => {
  await getProducts();
})

const filterProducts = computed(() => {
  return products.value.filter(product => product?.parent_cat_id === 1);
})

</script>

<template>
  <section class="home-product-horizontal-style">
    <h2>Cloths and Footware</h2>
    <swiper :mousewheel="true" :navigation="true" :keyboard="true" :slidesPerView="1" :spaceBetween="30" :pagination="{
      clickable: true,
    }" :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    }" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(product, index) in filterProducts" :key="index">
        <div class="slider-card-style">
          <RouterLink class="no-underline-link"
            :to="{ name: 'ProductDetail', params: { id: product.pro_id, slug: product.pro_name.replace(/\s+/g, '-') } }">
            <img :src="product?.pro_image" alt="">
          </RouterLink>
          
          <div>
            <h5><del>$45</del> Save <span>${{ product?.price }}</span></h5>
            <p>Description</p>
            <span class="material-icons">
              shopping_cart
            </span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
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

.home-product-horizontal-style {
  margin-top: 30px;
  background: #1F5DA0;
  padding-bottom: 45px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 45px;
}

.home-product-horizontal-style h2 {
  margin-bottom: 25px;
  background: #1F5DA0;
  text-align: center;
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 35px;
}

.home-product-horizontal-style h2:hover {
  color: #D9946D;
  cursor: pointer;
}


.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}




/* card style  */
.slider-card-style {
  padding: 10px 10px;
  border-radius: 20px;
}

.slider-card-style img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.slider-card-style:hover {
  cursor: pointer;
  z-index: 2
}

.slider-card-style div h5 del {
  color: #E33F5D;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: 500;
  font-style: normal;
  font-size: 40px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.material-icons:hover {
  color: #1F5DA0;
  cursor: pointer;
}
</style>