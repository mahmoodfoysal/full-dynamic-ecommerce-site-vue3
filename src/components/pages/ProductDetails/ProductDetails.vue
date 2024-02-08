<script setup>

</script>

<template>
    <section class="product-details-section">
        <div class="row g-4">
            <div class="col-md-4 product-image-div">
                <img src="/src/assets/images/apple.jpg" class="img-fluid rounded-start" alt="product-img">
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Product Name</h5>
                        <div class="d-flex align-items-center justify-content-between pb-2 border-bottom">
                            <span>Brand: name</span>
                            <span>Rating: *****</span>
                            <span class="material-icons">favorite</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-2 border-bottom">
                            <h6>$$$$$</h6>
                            <span>Product ID: 52531</span>
                            <span>Category: Men</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-2 border-bottom">
                            <span>Sold By: </span>
                            <span>Stock: 452</span>
                        </div>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">

            </div>
        </div>
    </section>
</template>

<style scoped>
.product-details-section {}

.product-image-div {
    border: 1px solid gray;
    padding: 70px 10px;
}

@media (min-width: 1200px) {
    .product-details-section {
        max-width: 1300px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 992px) {
    .product-details-section {
        max-width: 960px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 768px) {
    .product-details-section {
        max-width: 720px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 540px) {
    .product-details-section {
        max-width: 720px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}
</style>