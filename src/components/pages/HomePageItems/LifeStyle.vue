<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, computed, ref } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Keyboard, Autoplay } from 'swiper/modules';
import { RouterLink } from 'vue-router';
import { useStore } from '@/stores/TaskStore.js';
import { getProducts } from '@/API/All_API.js';

const store = useStore();
const modules = [Navigation, Keyboard, Autoplay];

const products = ref([]);

onMounted(() => {
  handleGetProducts();
});

const handleGetProducts = async () => {
  try {
    const result = await getProducts();
    products.value = result?.data;
  }
  catch (error) {
    console.log("Products", error);
  }
};


// cart code write here 
const handleAddToCart = (product) => {
  const { _id, pro_name, price, pro_image, pro_id, stock, currency_name, currency_id, discount_price } = product;
  let item = {
    _id,
    pro_name,
    price,
    pro_image,
    pro_id,
    stock,
    currency_name, 
    currency_id,
    discount_price
  }
  let shopping_cart = getDb() || {};

  // if (shopping_cart[item.pro_id]) {
  //   shopping_cart[item.pro_id].quantity += 1;
  // }

  // else {
  //   item.quantity = 1;
  //   shopping_cart[item.pro_id] = item;
  // }

  if (shopping_cart[item.pro_id]) {
    if (shopping_cart[item.pro_id].quantity < stock) {
      shopping_cart[item.pro_id].quantity += 1;
    } else {
      alert("Cannot add more, stock limit reached!");
    }
  } else {
    item.quantity = 1;
    shopping_cart[item.pro_id] = item;
  }

  updateDb(shopping_cart);
}

const getDb = () => {
  const cartData = localStorage.getItem('shopping_cart');
  return cartData ? JSON.parse(cartData) : null;
}

const updateDb = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
  store.setCartItem(cart);
}

const filterProducts = computed(() => {
  return products.value.filter(product => product?.sub_cat_id === 11 && product?.prod_type == "D" && product?.status === 1);
});


</script>
    
<template>
  <section class="home-product-horizontal-style">
    <RouterLink
    class="link-decoration"
    :to="{ name: 'CategoryProducts', params: { id: 11, slug: `Women's-Fashion` } }"
    >
      <h2>Life Style</h2>
    </RouterLink>
    <swiper 
    :mousewheel="true" 
    :navigation="true" 
    :keyboard="true" 
    :slidesPerView="1" 
    :spaceBetween="30" 
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: false,
    }"
    :breakpoints="{
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
            :to="{ name: 'ProductDetail', params: { id: product.pro_id, slug: product?.pro_name?.replace(/\s+/g, '-') } }">
            <img :src="product?.pro_image" alt="">
          </RouterLink>

          <div>
            <h5><del>{{ product?.price }} {{ product?.currency_name }}</del> Save <span>{{ product?.discount_price }} {{ product?.currency_name }}</span></h5>
            <h6><span>{{ product?.pro_name }}</span></h6>
            <p>Stock: <span>{{ product?.stock }}</span></p>
            <span @click="handleAddToCart(product)" class="material-icons">
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
p, span {
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
  -webkit-font-smoothing: antialiased;
}

.material-icons:hover {
  color: #1F5DA0;
  cursor: pointer;
}

.link-decoration {
  text-decoration: none;
}
</style>