<script setup>

</script>

<template>
 <section class="mobile-menu-style container">
    <h4>Hello World</h4>
 </section>
</template>

<style scoped>
@media only screen and (max-width: 2560px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .mobile-menu-style {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .mobile-menu-style {
        width: 100% !important;
        margin: auto;
        display: block;
    }
}

@media only screen and (max-width: 540px) {
    .mobile-menu-style {
        max-width: 100% !important;
        display: block;
    }
}
</style>