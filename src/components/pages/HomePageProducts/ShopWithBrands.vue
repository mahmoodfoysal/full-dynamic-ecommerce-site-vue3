<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

const modules = [Navigation, Mousewheel, Keyboard, Autoplay];

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
        slidesPerView: 5,
        spaceBetween: 50,
    },
}" :modules="modules" class="mySwiper">
        <swiper-slide v-for="n in 20">
            <div class="slider-card-style">
                <img src="../../../assets/images/apple.jpg" alt="">
            </div>
        </swiper-slide>


    </swiper>
    </section>
</template>
    
<style scoped>
h1, h2, h3, h4, h5, h6, p {
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
  font-weight: Bold;
  font-size: 35px;
}
.home-product-horizontal-style h2:hover {
  cursor: pointer;
}

.slider-card-style {
  padding: 10px 10px;
  border-radius: 20px;
}
.slider-card-style:hover {
  cursor:pointer;
  z-index: 2
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