<script setup>
import { toRefs, defineProps} from 'vue';

const props = defineProps({
    productItem: {
        type: Object,
        default: () => ([])
    }
});

const {productItem} = toRefs(props);
</script>

<template>
    <div  class="card">
      <img src="/src/assets/images/apple.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ productItem.pro_name }}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
</template>

<style scoped>

</style>