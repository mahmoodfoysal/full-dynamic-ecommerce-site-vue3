<script setup>
import { toRefs } from 'vue';
import { useStore } from '@/stores/TaskStore.js';
import { RouterLink } from 'vue-router';

const store = useStore();

const props = defineProps({
  productItem: {
    type: Object,
    default: null
  }
});

const { productItem } = toRefs(props);

const handleAddToCart = (product) => {
  const { pro_name, price, pro_image, pro_id, currency_name } = product;
  let item = {
    pro_name,
    price,
    pro_image,
    pro_id,
    currency_name
  }
  let shopping_cart = getDb() || {};
  if (shopping_cart[item.pro_id]) {
    shopping_cart[item.pro_id].quantity += 1;
  } 

  else {
    item.quantity = 1;
    shopping_cart[item.pro_id] = item;
  }
  updateDb(shopping_cart);
};

const getDb = () => {
  const cartData = localStorage.getItem('shopping_cart');
  return cartData ? JSON.parse(cartData) : null;
};

const updateDb = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
  store.setCartItem(cart);
};

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
        <h6 class="card-title">{{ productItem.price }} {{ productItem.currency_name }}</h6>
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