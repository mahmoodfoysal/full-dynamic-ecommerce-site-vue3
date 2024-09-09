<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Keyboard, Autoplay } from 'swiper/modules';
import { onMounted, ref } from 'vue';
import { getBrands } from '@/API/All_API.js';

const modules = [Navigation, Keyboard, Autoplay];

const brands = ref([]);

onMounted(() => {
  handleGetBrands()
});

const handleGetBrands = async () => {
  try {
    const result = await getBrands();
    brands.value = result?.data;
  }
  catch (error) {
    console.log("Brand", error);
  }
}

</script>

<template>
  <section class="home-product-horizontal-style">
    <h2>Shopping With Brands</h2>
    <swiper :mousewheel="true" :navigation="true" :keyboard="true" :slidesPerView="1" :spaceBetween="30" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" :pagination="{
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
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }" :modules="modules" class="mySwiper">

      <swiper-slide v-for="(item, index) in brands" :key="index">
        <div class="slider-card-style">
          <img :src="item?.brand_image" alt="Brand">
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
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
}

.home-product-horizontal-style h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #1F5DA0;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 35px;
}

.home-product-horizontal-style h2:hover {
  cursor: pointer;
}

.slider-card-style {
  padding: 10px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.slider-card-style:hover {
  cursor: pointer;
  z-index: 2;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, .25);
  transition: box-shadow .5s;
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
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>