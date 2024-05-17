<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import getDataFromCentralApiFile from '@/API/All_API.js';
import { useStore } from '@/stores/TaskStore.js';
import { getAuth, signOut } from 'firebase/auth';

const store = useStore();

const { getCategories, categories } = getDataFromCentralApiFile();

onMounted(async () => {
    await getCategories();
});

const showSidebar = ref(false);
const toggleDropdown = (parentCat) => {
    parentCat.isActive = !parentCat.isActive;
};

const subToggleDropdown = (subCat) => {
    subCat.isActive = !subCat.isActive;
};

const subSubToggleDropdown = (subSubCat) => {
    subSubCat.isActive = !subSubCat.isActive;
};

const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        store.setUser(null);
        sessionStorage.removeItem('user');
    }).catch((error) => {

    });
};

const loginHandler = () => {
    router.push('/login');
}

</script>

<template>
    <section class="mobile-menu-style container">
        <div class="mobile-menu-style d-flex justify-content-between align-items-center">
            <RouterLink :to="{ name: 'Home' }" class="link-style">
                <h6>Home</h6>
            </RouterLink class="link-style">
            <h6 data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                Categories</h6>
            <RouterLink :to="{ name: 'Products' }" class="link-style">
                <h6>Products</h6>
            </RouterLink>
            <RouterLink v-if="store.user === null" :to="{ name: 'Login' }" class="link-style">
                <h6>Login</h6>
            </RouterLink>
            <h6 v-else data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                Profile</h6>
        </div>
    </section>
    <!-- mobile drawer section  -->
    <section class="mobile-drawer">
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
            id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Categories</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="mobile-category-style">
                    <nav class="sidebar-style">
                        <ul>
                            <li v-for="(parentCat, index) in categories" :key="index" class="dropdown">
                                <RouterLink
                                    :to="{ name: 'CategoryProducts', params: { id: parentCat.parent_cat_id, slug: parentCat.parent_cat_name.replace(/\s+/g, '-') } }">
                                    <a href="">
                                        {{ parentCat.parent_cat_name }}
                                        <span class="" @click="toggleDropdown(parentCat)"
                                            @mouseover="showSidebar = true" @mouseout="showSidebar = false"
                                            :class="{ 'active': parentCat.isActive }">&rsaquo;</span>
                                    </a>
                                </RouterLink>
                                <ul v-show="parentCat.isActive">
                                    <li @mouseover="showSidebar = true" @mouseout="showSidebar = false"
                                        :class="{ 'd-none': !showSidebar, 'd-block': showSidebar }"
                                        v-for="(subCat, index) in parentCat.sub_cat_info" :key="index"
                                        class="dropdown-2 ms-auto">
                                        <RouterLink
                                            :to="{ name: 'CategoryProducts', params: { id: subCat.sub_cat_id, slug: subCat.sub_cat_name.replace(/\s+/g, '-') } }">
                                            <a href="">
                                                {{ subCat.sub_cat_name }}<span class=""
                                                    @click="subToggleDropdown(subCat)" @mouseover="showSidebar = true"
                                                    @mouseout="showSidebar = false"
                                                    :class="{ 'active': subCat.isActive }">&rsaquo;</span>
                                            </a>
                                        </RouterLink>
                                        <ul v-show="subCat.isActive">
                                            <li @mouseover="showSidebar = true" @mouseout="showSidebar = false"
                                                :class="{ 'd-none': !showSidebar, 'd-block': showSidebar }"
                                                v-for="(subSubCat, index) in subCat.sub_sub_cat_info" :key="index"
                                                class="dropdown-3 ms-2">
                                                <RouterLink
                                                    :to="{ name: 'CategoryProducts', params: { id: subSubCat.sub_sub_cat_id, slug: subSubCat.sub_sub_cat_name.replace(/\s+/g, '-') } }">
                                                    <a href="">
                                                        {{ subSubCat.sub_sub_cat_name }} <span
                                                            @click="subSubToggleDropdown(subSubCat)"
                                                            @mouseover="showSidebar = true"
                                                            @mouseout="showSidebar = false"
                                                            :class="{ 'active': subSubCat.isActive }"
                                                            class="">&rsaquo;</span>
                                                    </a>
                                                </RouterLink>
                                                <ul v-show="subSubCat.isActive">
                                                    <li v-for="(subSubSubCat, index) in subSubCat.sub_sub_sub_cat_info"
                                                        :key="index" class="dropdown-4 ms-2">
                                                        <RouterLink
                                                            :to="{ name: 'CategoryProducts', params: { id: subSubSubCat.sub_sub_sub_cat_id, slug: subSubSubCat.sub_sub_sub_cat_name.replace(/\s+/g, '-') } }">
                                                            <a href="">
                                                                {{ subSubSubCat.sub_sub_sub_cat_name }}
                                                            </a>
                                                        </RouterLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <section class="mobile-drawer">
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <section>
                    <div class="d-flex justify-content-center">
                        <img v-if="store.user !== null" :src="store.user.photoURL" alt="Avatar" class="avatar">
                    </div>
                    <div class="d-flex justify-content-center flex-column align-items-center mt-3 profile-details">
                        <h6 v-if="store.user !== null">Name: <span>{{ store.user.displayName }}</span></h6>
                        <p v-if="store.user !== null">Email: <span>{{ store.user.email }}</span></p>
                        <p v-if="store.user !== null">Phone no: <span>{{ store.user.phoneNo }}</span></p>
                    </div>
                    <div class="d-flex justify-content-center flex-column align-items-center mt-3 logout-btn-style">
                        <button v-if="store.user === null" @click="loginHandler">Please Login</button>
                        <button v-else @click="handleLogout">Log out</button>
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
label,
p,
ul {
    margin: 0;
    padding: 0;
}

.mobile-menu-style {
    background-color: #1F5DA0;
    bottom: 0;
    height: 25px;
    width: 100%;
}

.mobile-menu-style h6 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    color: #FFFFFF;
    font-size: 15px;
}

.link-style {
    text-decoration: none;
}

.avatar {
    vertical-align: middle;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 16px;
}

.profile-details {
    line-height: 20px;
}

.profile-details h6 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 12px;
}

.profile-details h6 span {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 13px;
}

.profile-details p {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 11px;
}
.profile-details p span {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 11px;
}

.logout-btn-style button {
    padding: 8px 20px;
    border: white;
    background-color: red;
    color: #FFFFFF;
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}


/* category menu for clickable  */
.sidebar-style ul li {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    text-decoration: none;
    list-style: none;
}

.sidebar-style ul li a {
    text-decoration: none;
}

.sidebar-style {
    /* width: 250px;
    position: fixed;
    top: 110px;
    left: 23px;
    background: #FFF; */
}

.sidebar-style ul {
    /* position: relative;
    list-style-type: none;
    height: 442px;
    padding: 0;
    margin: 0; */
}


.sidebar-style ul li a {
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    letter-spacing: 1px;
    font-weight: 500;
    height: 35px;
    transition: .5s ease;
}

.sidebar-style ul li a:hover {
    background: rgb(231, 227, 227);
    /* color: white; */
}

.sidebar-style ul ul li a {
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
    padding-left: 10px;
    font-weight: 500;
    height: 35px;
    transition: .5s ease;
}


.sidebar-style ul span {
    position: absolute;
    right: 20px;
    font-size: 1.5em;
}



.sidebar-style ul .dropdown:hover>ul {
    display: initial;
}

.sidebar-style ul .dropdown-2:hover>ul {
    display: initial;
}

.sidebar-style ul ul .dropdown-3:hover ul {
    display: initial;
}


@media only screen and (max-width: 2560px) {
    .mobile-menu-style {
        display: none;
    }

    .mobile-drawer {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .mobile-menu-style {
        display: none;
    }

    .mobile-drawer {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .mobile-menu-style {
        display: none;
    }

    .mobile-drawer {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .mobile-menu-style {
        width: 100% !important;
        margin: auto;
        display: block;
        position: sticky;
        z-index: 5;
    }

    .mobile-drawer {
        display: block;
    }

    .active-link {
        opacity: .8;
    }
}

@media only screen and (max-width: 540px) {
    .mobile-menu-style {
        max-width: 100% !important;
        display: block;
        position: sticky;
        z-index: 5;
    }

    .offcanvas {
        max-width: 85% !important;
    }

    .mobile-drawer {
        display: block;
    }

    .active-link {
        opacity: .8;
    }
}
</style>