<script setup>
import HomeCarousel from '../HomePageItems/HomeCarousel.vue';
import ImageCategoryRandom from '../HomePageItems/ImageCategoryRandom.vue';
import ClothsAndFootware from '../HomePageItems/ClothsAndFootware.vue';
import ShopWithBrands from '../HomePageItems/ShopWithBrands.vue';
import FacilityAndPricing from '../FacilityAndPricing/FacilityAndPricing.vue';
import OffersAndPromotional from '../HomePageItems/OffersAndPromotional.vue';
import DiscountPoster from '../HomePageItems/DiscountPoster.vue';
import LifeStyle from '../HomePageItems/LifeStyle.vue';
import Electronics from '../HomePageItems/Electronics.vue';
import ContactAndReachedDoor from '../HomePageItems/ContactAndReachedDoor.vue';

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <HomeCarousel></HomeCarousel>
    <ImageCategoryRandom></ImageCategoryRandom>
    <DiscountPoster></DiscountPoster>
    <ClothsAndFootware></ClothsAndFootware>
    <ShopWithBrands></ShopWithBrands>
    <LifeStyle></LifeStyle>
    <OffersAndPromotional></OffersAndPromotional>
    <Electronics></Electronics>
    <FacilityAndPricing></FacilityAndPricing>
    <ContactAndReachedDoor></ContactAndReachedDoor>
    <button 
    @click="scrollToTop"
    class="top-scroll-btn"
    ><span class="material-icons">
            expand_less
        </span></button>
</template>

<style scoped>
.top-scroll-btn {
    position: fixed;
    bottom: 45px;
    left: 19px;
    border: none;
    border-radius: 20px;
    font-size: 26px;
    width: 48px;
    z-index: 1000;
}
.top-scroll-btn:hover {
    background: blue;
    border: 2px solid #FFF;
    color: #FFF;
}
</style>