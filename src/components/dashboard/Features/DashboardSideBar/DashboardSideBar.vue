<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <RouterLink 
    :to="{name: 'DashboardHomeDefault'}"
    class="router-link-style"
    >
        <div class="d-flex align-items-center menu-items-style mb-2">
        <span class="material-icons">
            home
        </span>
        <h5>
            Home
        </h5>
    </div>
    </RouterLink>
    <RouterLink 
    :to="{name: 'Admin'}"
    class="router-link-style"
    >
        <div class="d-flex align-items-center menu-items-style mb-2">
        <span class="material-icons">
            <span class="material-icons">
                admin_panel_settings
            </span>
        </span>
        <h5>
            Make Admin
        </h5>
    </div>
    </RouterLink>
    <RouterLink :to="{name: 'Category'}" class="router-link-style">
        <div class="d-flex align-items-center menu-items-style mb-2">
        <span class="material-icons">
            <span class="material-icons">
category
</span>
        </span>
        <h5>
            Category
        </h5>
    </div>
    </RouterLink>

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

</style>