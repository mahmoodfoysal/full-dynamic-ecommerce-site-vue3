<script setup>
import { toRefs, defineProps } from 'vue';
import { useStore } from '@/stores/TaskStore.js';
import { RouterLink } from 'vue-router';

// call store from pinia store and set a varible which name store for access pinia store 
const store = useStore();

// define props which data comes from the parent file 
const props = defineProps({
  productItem: {
    type: Object,
    default: null
  }
});

// reactive the props data 
const { productItem } = toRefs(props);

// event handler for product add to the cart 
const handleAddToCart = (product) => {
  // destructure products data for set to the cart 
  const { pro_name, price, pro_image, pro_id } = product;
  // declare a object for store in the localStorage 
  let item = {
    pro_name,
    price,
    pro_image,
    pro_id,
  }
  // check shopping cart data have or empty 
  let shopping_cart = getDb() || {};

  // if product have the localStorage then his quantity incease by one 
  if (shopping_cart[item.pro_id]) {
    shopping_cart[item.pro_id].quantity += 1;
  } 
  // otherwise new item add in the storage and his quantity is 1 
  else {
    item.quantity = 1;
    shopping_cart[item.pro_id] = item;
  }
  // update the database who store data to the localStorage 
  updateDb(shopping_cart);
}

// get data from localStorage 
const getDb = () => {
  const cartData = localStorage.getItem('shopping_cart');
  return cartData ? JSON.parse(cartData) : null;
}

// update data to the localStorage 
const updateDb = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
  store.setCartItem(cart);
}

</script>

<template>
  <div class="card card-style">
    <RouterLink class="no-underline-link"
      :to="{ name: 'ProductDetail', params: { id: productItem.pro_id, slug: productItem.pro_name.replace(/\s+/g, '-') } }">
      <img :src="productItem.pro_image" class="card-img-top" alt="Card Image">
    </RouterLink>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="card-title">{{ productItem.pro_name }}</h6>
        <h6 class="card-title">$ {{ productItem.price }}</h6>
      </div>
      <p class="card-text">{{ productItem.description.substr(0, 90) }}</p>
      <div class="card-btn-style">
        <button @click="handleAddToCart(productItem)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-style:hover {
  cursor: pointer;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, .25);
  transition: box-shadow .5s;
}

.no-underline-link {
  text-decoration: none;
}

.card-style h6 {
  color: #1F5DA9;
}

.card-style p {
  text-align: justify;
}

.card-style img {
  width: 100%;
  height: 40vh;
  object-fit: contain;
}

.card-btn-style {
  text-align: center;
}

.card-btn-style button {
  outline: none;
  border: none;
  padding: 8px 16px;
  background: #1F5DA0;
  color: white;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 15px;
}

.card-btn-style button:hover {
  background: #2D76C4;
  cursor: pointer;
}
</style>