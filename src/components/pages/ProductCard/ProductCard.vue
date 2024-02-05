<script setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  productItem: {
    type: Object,
    default: null
  }
});

const { productItem } = toRefs(props);
</script>

<template>
  <div class="card card-style">
    <img :src="productItem.pro_image" class="card-img-top" alt="Card Image">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="card-title">{{ productItem.pro_name }}</h6>
        <h6 class="card-title">$ {{ productItem.price }}</h6>
      </div>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.</p>
      <div class="card-btn-style">
        <button>Add to Cart</button>
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

.card-style h6 {
  color: #1F5DA9;
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