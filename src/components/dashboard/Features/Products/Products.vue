<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, getCategories, postProduct } from '@/API/All_API';

const productList = ref([]);
const categoryList = ref([]);
const subCategoryList = ref([]);
const subSubCategoryList = ref([]);
const subSubSubCategoryList = ref([]);
const isModal = ref(false);
const isValidation = ref(false);
const inputData = ref({
    parent_cat_info: null,
    sub_cat_info: null,
    sub_sub_cat_info: null,
    sub_sub_sub_cat_info: null,
    prod_type: null,
    prod_cat_id: null,
    prod_img: '',
    prod_name: '',
    prod_price: null,
    discount_price: null,
    offer_price: null,
    prod_stock: null,
    brand_name: null,
    description: null
});

const productType = [
    {
        name: "Regular",
        type: "R"
    },
    {
        name: "Discount",
        type: "D"
    },
    {
        name: "Offer",
        type: "O"
    },
];

onMounted(() => {
    handleGetProducts();
    handleGetCategories();
});

const handleCreate = () => {
    isModal.value = true;
    isValidation.value = false;
};

const handleCancel = () => {
    handleResetInput();
};

const handleClose = () => {
    isModal.value = false;
}

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        productList.value = result?.data;
    }
    catch(error) {
        console.log("get products", error);
    }
};

const handleGetCategories = async () => {
    try {
        const result = await getCategories();
        categoryList.value = result?.data;
    }
    catch(error) {
        console.log(error);
    }
};

const handleSubCategory = () => {
    subSubSubCategoryList.value = [];
    subSubCategoryList.value = [];
    subCategoryList.value = inputData.value.parent_cat_info.sub_cat_info
};

const handleSubSubCategory = () => {
    subSubSubCategoryList.value = [];
    subSubCategoryList.value = inputData.value.sub_cat_info.sub_sub_cat_info
};

const handleSubSubSubCategory = () => {
    subSubSubCategoryList.value = inputData.value.sub_sub_cat_info.sub_sub_sub_cat_info
};

const handleSubmit = async () => {
    try {

        const data = {
            
        }

        const text = "Are you want to sure?";
        if(confirm(text) == true) {
            const result = await postProduct();
            console.log(result?.data);
        }
        
    }
    catch(error) {
        console.log("product post", error);
    }
}

const handleResetInput = () => {
    inputData.value.parent_cat_info = null;
    inputData.value.sub_cat_info = null;
    inputData.value.sub_sub_cat_info = null;
    inputData.value.sub_sub_sub_cat_info = null;
    inputData.value.prod_type = null;
    inputData.value.prod_cat_id = null;
    inputData.value.prod_img = null;
    inputData.value.prod_name = null;
    inputData.value.prod_price = null;
    inputData.value.discount_price = null;
    inputData.value.offer_price = null;
    inputData.value.prod_stock = null;
    inputData.value.brand_name = null;
    inputData.value.description = null;
};

</script>

<template>
    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button @click="handleCreate" type="button" class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Product</button>
        </div>

        <!-- Image category list  -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
            <div class="col">
                <div class="card">
                    <div class="row">
                        <div class="col-md-3 image-style">
                            <img :src="item?.img" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 class="card-title">Name</h5>
                                <p class="card-text mb-0">Parent Category: name</p>
                                <p class="card-text mb-0">Sub Category: name</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="icon-style d-flex align-items-center mt-3">
                                <span @click="handleEdit()" class="material-icons me-2">
                                    edit
                                </span>
                                <span @click="handleDelete()" class="material-icons">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add image Category Modal div  -->

        <div v-if="isModal" class="offcanvas offcanvas-end category-div show" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" style="visibility: visible; width: 100%;">
            <div class="d-flex align-items-center">
                <button @click="handleClose" type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Add Category</h5>
            </div>

            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3">Add product</h5>
                    <div class="row g-4">

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category ID *
                            </label>
                            <select 
                            @change="handleSubCategory"
                            v-model="inputData.parent_cat_info"
                            :class="{ isValidate: isValidation && !inputData.parent_cat_info }"
                            class="form-select form-select-md mb-1">
                                <option 
                                v-for="(item, index) in categoryList"
                                :key="index"
                                :value="item"
                                >
                                ( {{ item?.parent_cat_id }} ) - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub category ID *
                            </label>
                            <select 
                            @change="handleSubSubCategory"
                            v-model="inputData.sub_cat_info"
                            :class="{ isValidate: isValidation && !inputData.sub_cat_info }"
                            class="form-select form-select-md mb-1">
                                <option
                                v-for="(item, index) in subCategoryList"
                                :key="index"
                                :value="item"
                                >
                                    ( {{ item?.sub_cat_id }} ) - {{ item?.sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub sub category ID
                            </label>
                            <select 
                            @change="handleSubSubSubCategory"
                            v-model="inputData.sub_sub_cat_info"
                            class="form-select form-select-md mb-1">
                                <option
                                v-for="(item, index) in subSubCategoryList"
                                :key="index"
                                :value="item"
                                >
                                    ( {{ item?.sub_sub_cat_id }} ) - {{ item?.sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub sub sub category ID
                            </label>
                            <select 
                             v-model="inputData.sub_sub_sub_cat_info"
                            class="form-select form-select-md mb-1">
                                <option
                                v-for="(item, index) in subSubSubCategoryList"
                                :key="index"
                                :value="item"
                                >
                                    ( {{ item?.sub_sub_sub_cat_id }} ) - {{ item?.sub_sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Product Type *
                            </label>
                            <select 
                            v-model="inputData.prod_type"
                            :class="{ isValidate: isValidation && !inputData.prod_type }"
                            class="form-select form-select-md mb-1">
                                <option
                                v-for="(item, index) in productType"
                                :key="index"
                                :value="item"
                                >
                                    {{ item?.name }} - ( {{ item.type }} )
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product Category ID *
                            </label>
                            <input 
                            v-model="inputData.prod_cat_id"
                            :class="{ isValidate: isValidation && !inputData.prod_cat_id }"
                            type="Number" class="form-control" id="exampleInputText" placeholder="Product ID">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product image url *
                            </label>
                            <input 
                            v-model="inputData.prod_img"
                            :class="{ isValidate: isValidation && !inputData.prod_img }"
                            type="url" class="form-control" id="exampleInputText" placeholder="Product image">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product name *
                            </label>
                            <input 
                            v-model="inputData.prod_name"
                            :class="{ isValidate: isValidation && !inputData.prod_name }"
                            type="text" class="form-control" id="exampleInputText" placeholder="Product name">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Price *
                            </label>
                            <input 
                            v-model="inputData.prod_price"
                            :class="{ isValidate: isValidation && !inputData.prod_price }"
                            type="number" class="form-control" id="exampleInputText" placeholder="Product price">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Stock *
                            </label>
                            <input 
                            v-model="inputData.prod_stock"
                            :class="{ isValidate: isValidation && !inputData.prod_stock }"
                            type="number" class="form-control" id="exampleInputText" placeholder="Product stock">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand *
                            </label>
                            <input 
                            v-model="inputData.brand_name"
                            :class="{ isValidate: isValidation && !inputData.brand_name }"
                            type="number" class="form-control" id="exampleInputText" placeholder="Brand name">
                        </div>

                        <div class="col-md-12 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Description *
                            </label>
                            <textarea 
                            v-model="inputData.description"
                            :class="{ isValidate: isValidation && !inputData.description }"
                            type="number" class="form-control" id="exampleInputText" placeholder="Product description"></textarea>
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handleSubmit" type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </section>
</template>

<style scoped src="./Products.css"></style>