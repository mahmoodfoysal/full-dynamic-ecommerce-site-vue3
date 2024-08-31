<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink :to="{ name: 'DashboardHomeDefault' }" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
            <span class="material-icons">
                home
            </span>
            <h5>
                Home
            </h5>
        </div>
    </RouterLink>
    <RouterLink :to="{ name: 'Admin' }" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
            <span class="material-icons">
                admin_panel_settings
            </span>
            <h5>
                Make Admin
            </h5>
        </div>
    </RouterLink>
    <RouterLink :to="{ name: 'Category' }" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
            <span class="material-icons">
                category
            </span>
            <h5>
                Category
            </h5>
        </div>
    </RouterLink>

    <RouterLink :to="{ name: 'ImageCategory' }" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
            <span class="material-icons">
                collections
            </span>
            <h5>
                Image Category
            </h5>
        </div>
    </RouterLink>

    <RouterLink :to="{ name: 'AddProducts' }" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
            <span class="material-icons">
                inventory_2
            </span>
            <h5>
                Products
            </h5>
        </div>
    </RouterLink>

    <!-- accrodion  -->
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    <span class="material-icons me-1">
                        list_alt
                    </span> Orders
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                pending_actions
                            </span>
                            <h5>
                                Pending
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Store' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                warehouse
                            </span>
                            <h5>
                                Warehouse
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Shipping' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                local_shipping
                            </span>
                            <h5>
                                Shipping
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Delivery' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style">
                            <span class="material-icons">
                                delivery_dining
                            </span>
                            <h5>
                                Delivery
                            </h5>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <span class="material-icons me-1">
                        gamepad
                    </span>
                    Home Controller
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                image
                            </span>

                            <h5>
                                Sliding Poster
                            </h5>
                        </div>
                    </RouterLink>

                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                trending_down
                            </span>

                            <h5>
                                Discount Poster
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                shopping_bag
                            </span>

                            <h5>
                                Offer Poster
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                add_box
                            </span>

                            <h5>
                                Brand
                            </h5>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'Pending' }" class="router-link-style">
                        <div class="d-flex align-items-center menu-items-style mb-2">
                            <span class="material-icons">
                                upcoming
                            </span>

                            <h5>
                                Upcoming Events
                            </h5>
                        </div>
                    </RouterLink>

                </div>
            </div>
        </div>

        <!-- <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that
                    just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
                    overflow.
                </div>
            </div>
        </div> -->
    </div>
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

.menu-items-style:hover {
    cursor: pointer;
    color: #1F5DA0;
    text-decoration: none;
}

.menu-items-style span {
    font-size: 25px;
}

.menu-items-style h5 {
    font-size: 15px;
}

.router-link-style {
    text-decoration: none;
    color: black;
}

.active-link {
    text-decoration: none;
    color: #1F5DA0;
}

.accordion-button {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 8px !important;
    font-size: 1rem;
    color: var(--bs-accordion-btn-color);
    text-align: left;
    background-color: var(--bs-accordion-btn-bg);
    border: 0;
    border-radius: 0;
    overflow-anchor: none;
    transition: var(--bs-accordion-transition);
}

.accordion-button:focus {
    outline: none;
    box-shadow: none;
}

.accordion-body {
    padding: 8px 8px !important;
}
</style>