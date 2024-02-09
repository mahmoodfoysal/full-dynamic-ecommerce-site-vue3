<script setup>

</script>

<template>
    <section class="product-details-section">
        <div class="row g-4">
            <div class="col-md-4 product-image-div">
                <img src="/src/assets/images/apple.jpg" class="img-fluid rounded-start" alt="product-img">
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Product Name</h5>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Brand: name</span>
                            <span>Rating: *****</span>
                            <span class="material-icons">favorite</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <h6>$$$$$</h6>
                            <span>Stock: 452</span>
                            <span>Product ID: 52531</span>

                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Sold By: </span>
                            <span>Category: Men</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Size:</span>
                            <span>Color:</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">

                            <div class="checkout-btn-div">
                                <button>Add To Cart</button>
                            </div>
                            <div class="col-md-3 d-flex justify-content-center align-items-center">
                                <div class="d-flex align-items-center add-sub-style">
                                    <span class="material-icons me-2">
                                        remove
                                    </span>
                                    <h5 class="me-2 mb-0">5</h5>
                                    <span class="material-icons me-2">
                                        add
                                    </span>
                                </div>
                            </div>
                            <div class="checkout-btn-div">
                                <button>Buy Now</button>
                            </div>

                        </div>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 condition-div-style">
                <section>
                    <div class="d-flex justify-contain-between mb-3 mt-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Free Shipping Inside City</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Home Delivery all over Country</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Various Payment Methods</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>30 Days Replacement Policy Selected Country</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Warranty not available</p>
                        </span>
                    </div>
                </section>
            </div>
        </div>
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

.product-details-section {}

.product-image-div {
    border: 1px solid gray;
    padding: 70px 10px;
    margin-bottom: auto;
}

.product-image-div img {
    margin: auto;
}

.condition-div-style {
    background: #F1F1F1;
    padding: 0 15px;
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

.add-sub-style span {
    cursor: pointer;
    font-size: 31px;
}

.add-sub-style h5 {
    font-size: 27px;
}

.checkout-btn-div button {
    background: #1F5DA0;
    padding: 8px 18px;
    border: none;
    color: #FFF;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
}

.checkout-btn-div button:hover {
    cursor: pointer;
}
</style>