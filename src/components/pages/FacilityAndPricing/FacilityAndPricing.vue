<script setup>

</script>

<template>
    <section class="container facility-container">
        <div class="row row-cols-1 row-cols-md-4 row-cols-sm-1 row-cols-lg-4 g-4">
            <div class="col">
                <div class="card">
                    <img src="/src/assets/images/promotional-4.jpg" class="card-img-top" alt="Promotional Picture">
                </div>
            </div>
            <div class="col">
                <div class="card pricing-style">
                    <img src="/src/assets/images/promotional-1.jpg" class="card-img-top" alt="Promotional Picture">
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="/src/assets/images/promotional-2.jpg" class="card-img-top" alt="Promotional Picture">
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="/src/assets/images/promotional-3.jpg" class="card-img-top" alt="Promotional Picture">

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* .Facility-container {
    width: 1300px;
    margin: auto;
    margin-top: 30px;
} */

@media only screen and (max-width: 2560px) {
    .facility-container {
        max-width: 2200px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1920px) {
    .facility-container {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1440px) {
    .facility-container {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1024px) {
    .facility-container {
        max-width: 950px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 768px) {
    .facility-container {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 540px) {
    .facility-container {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}

</style>