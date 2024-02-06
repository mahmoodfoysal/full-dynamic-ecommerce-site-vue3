<script setup>

</script>

<template>
<section class="promotional-container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="/src/assets/images/offerposter.jpg" class="card-img-top" alt="Offer and Promotional">
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="/src/assets/images/watch photo.jpg" class="card-img-top" alt="Offer and Promotional">
    </div>
  </div>
</div>
</section>
</template>

<style scoped>
/* .promotional-container {
    width: 1300px;
    margin: auto;
    margin-top: 30px;
} */

@media (min-width: 1200px) {
  .promotional-container {
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 992px) {
  .promotional-container {
    max-width: 960px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 768px) {
  .promotional-container {
    max-width: 720px;
    margin: auto;
    margin-top: 30px;
}
}
@media (max-width: 540px) {
  .promotional-container {
    max-width: 720px;
    margin: auto;
    margin-top: 30px;
}
}

</style>