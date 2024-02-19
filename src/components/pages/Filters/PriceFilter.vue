<script setup>
import {ref} from 'vue';

// declare price range for filter by product price
const priceRanges = [
    { label: 'No Filter', min: 0, max: 100000 },
    { label: '$0 to $10', min: 0, max: 10 },
    { label: '$11 to $20', min: 11, max: 20 },
    { label: '$21 to $30', min: 21, max: 30 },
    { label: '$31 to $40', min: 31, max: 40 },
    { label: '$41 to $100', min: 41, max: 100 },
    { label: '$101 to $200', min: 101, max: 200 },
    { label: '$201 to $300', min: 201, max: 300 },
    { label: '$301 to $400', min: 301, max: 400 },
];

// reactive price filter value
const selectedPrice = ref(null);

// sliding price
const rangePrice = ref({ min: 1, max: 500 });


const emit = defineEmits(['price-selected', 'slide-price']);

const handlePriceChange = () => {
    emit('price-selected', selectedPrice.value);
};

const handleSlidePriceChange = () => {
    emit('slide-price', rangePrice.value)
}


</script>

<template>
    <section class="price-section">
        <label for="rangeInput">Select Range:
            <input type="range" v-model="rangePrice.min" :min="1" :max="500" @input="handleSlidePriceChange" />
        </label>
        <label v-for="(range, index) in priceRanges" :key="index" class="d-flex align-items-center mb-2">
            <input v-model="selectedPrice" type="radio" name="priceRanges" :value="range" :id="'price-' + index" @change="handlePriceChange">
            <p class="ms-2">{{ range.label }}</p>
        </label>
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

.price-section div,
input,
p {
    cursor: pointer;
}

.price-section {
    height: 230px !important;
    overflow-y: scroll;
}

</style>