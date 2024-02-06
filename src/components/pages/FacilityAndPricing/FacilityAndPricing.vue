<script setup>

</script>

<template>
    <section class="Facility-container">
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

@media (min-width: 1200px) {
  .Facility-container {
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 992px) {
  .Facility-container {
    max-width: 960px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 768px) {
  .Facility-container {
    max-width: 720px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 540px) {
  .Facility-container {
    max-width: 720px;
    margin: auto;
    margin-top: 30px;
}
}
</style>