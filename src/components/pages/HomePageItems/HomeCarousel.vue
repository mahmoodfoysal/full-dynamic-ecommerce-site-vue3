<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
// Mousewheel its work for mouse wheel sliding 
const modules = [Navigation, Pagination, Keyboard, Autoplay];
</script>

<template>
  <section>
    <swiper :mousewheel="true" :navigation="true" :keyboard="true" :slidesPerView="1" :spaceBetween="30" :pagination="{
      clickable: true,
    }" 
    :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
    }"
    :breakpoints="{
  '640'
    : {
    slidesPerView: 1,
    // spaceBetween: 20,
  },
  '768': {
    slidesPerView: 1,
    // spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 1,
    // spaceBetween: 50,
  },
}" :modules="modules" class="mySwiper">
      <swiper-slide>
        <img src="../../../assets//images//slider-1.jpg" class="d-block w-100" alt="...">
      </swiper-slide>
      <swiper-slide>
        <img src="../../../assets//images//slider-2.jpg" class="d-block w-100" alt="...">
      </swiper-slide>
      <swiper-slide>
        <img src="../../../assets//images//slider-3.jpg" class="d-block w-100" alt="...">
      </swiper-slide>
      <swiper-slide>
        <img src="../../../assets//images//slider-4.jpg" class="d-block w-100" alt="...">
      </swiper-slide>
      <swiper-slide>
        <img src="../../../assets//images//slider-5.jpg" class="d-block w-100" alt="...">
      </swiper-slide>
      <swiper-slide>
        <img src="../../../assets//images//slider-6.jpg" class="d-block w-100" alt="...">
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

</style>