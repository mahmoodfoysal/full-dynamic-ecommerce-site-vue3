<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, getCategories, postProduct, deleteProduct } from '@/API/All_API.js';

const productList = ref([]);
const categoryList = ref([]);
const subCategoryList = ref([]);
const subSubCategoryList = ref([]);
const subSubSubCategoryList = ref([]);
const isModal = ref(false);
const isValidation = ref(false);
const isEdit = ref(false);
const inputData = ref({
    id: null,
    parent_cat_info: null,
    sub_cat_info: null,
    sub_sub_cat_info: null,
    sub_sub_sub_cat_info: null,
    prod_type: null,
    prod_id: null,
    prod_image: '',
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
    handleResetInput();
};

const handleCancel = () => {
    handleResetInput();
};

const handleClose = () => {
    isModal.value = false;
    handleResetInput();
}

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        productList.value = result?.data;
    }
    catch (error) {
        console.log("get products", error);
    }
};

const handleGetCategories = async () => {
    try {
        const result = await getCategories();
        categoryList.value = result?.data;
    }
    catch (error) {
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
    inputData.value.sub_sub_sub_cat_info = null;
    inputData.value.sub_sub_cat_info = null;
    subSubCategoryList.value = inputData.value.sub_cat_info.sub_sub_cat_info
};

const handleSubSubSubCategory = () => {
    subSubSubCategoryList.value = inputData.value.sub_sub_cat_info.sub_sub_sub_cat_info
};

const handleSubmit = async () => {
    try {

        const data = {
            _id: isEdit ? inputData.value.id : null,
            parent_cat_id: Number(inputData.value.parent_cat_info.parent_cat_id),
            parent_cat_name: inputData.value.parent_cat_info.parent_cat_name,
            sub_cat_id: Number(inputData.value.sub_cat_info.sub_cat_id),
            sub_cat_name: inputData.value.sub_cat_info.sub_cat_name,

            sub_sub_cat_id: inputData.value.sub_sub_cat_info ? Number(inputData.value.sub_sub_cat_info.sub_sub_cat_id) : null,
            sub_sub_cat_name: inputData.value.sub_sub_cat_info ? inputData.value.sub_sub_cat_info.sub_sub_cat_name : null,

            sub_sub_sub_cat_id: inputData.value.sub_sub_sub_cat_info  ? Number(inputData.value.sub_sub_sub_cat_info.sub_sub_sub_cat_id) : null,
            sub_sub_sub_cat_name: inputData.value.sub_sub_sub_cat_info  ? inputData.value.sub_sub_sub_cat_info.sub_sub_sub_cat_name : null,

            prod_type_name: inputData.value.prod_type.name,
            prod_type: inputData.value.prod_type.type,
            prod_id: Number(inputData.value.prod_id),
            prod_image: inputData.value.prod_image,
            prod_name: inputData.value.prod_name,
            prod_price: Number(inputData.value.prod_price),
            discount_price: inputData.value.discount_price ? Number(inputData.value.discount_price) : null,
            offer_price: inputData.value.offer_price ? Number(inputData.value.offer_price) : null,
            prod_stock: Number(inputData.value.prod_stock),
            description: inputData.value.description,
            brand_name: inputData.value.brand_name,
        }

        const text = "Are you want to sure?";
        if (confirm(text) == true) {
            const result = await postProduct(data);
            if (result.data.insertedId || result.data.modifiedCount == 1) {
                alert(result.data.insertedId ? 'Product added successful' : 'Update product info');
                handleResetInput();
                isModal.value = false;
                isEdit.value = false;
            }
        }

    }
    catch (error) {
        console.log("product post", error);
    }
};

const handleEdit = (prod_item) => {
    isEdit.value = true;
    isModal.value = true;
    console.log(prod_item)
    if(isEdit) {
        inputData.value.id = prod_item._id;
        const findParentCat = categoryList?.value.find((item) => item.parent_cat_id === prod_item.parent_cat_id );
        inputData.value.parent_cat_info = findParentCat;

            const findSubCat = findParentCat?.sub_cat_info.find((item) => item.sub_cat_id === prod_item.sub_cat_id);
            handleSubCategory();
            inputData.value.sub_cat_info = findSubCat;

       
            const findSubSubCat = findSubCat?.sub_sub_cat_info.find((item) => item.sub_sub_cat_id == prod_item.sub_sub_cat_id);
            handleSubSubCategory();
            inputData.value.sub_sub_cat_info = findSubSubCat;
     
        
            if(prod_item.sub_sub_sub_cat_id) {
                const findSubSubSubCat = findSubSubCat.sub_sub_sub_cat_info.find((item) => item.sub_sub_sub_cat_id == prod_item.sub_sub_sub_cat_id);
                handleSubSubSubCategory();
            inputData.value.sub_sub_sub_cat_info = findSubSubSubCat;
        }



        inputData.value.prod_type = productType.find((item) => item.type == prod_item.prod_type);
        inputData.value.prod_id = prod_item?.prod_id;
        inputData.value.prod_image = prod_item?.prod_image;
        inputData.value.prod_name = prod_item?.prod_name;
        inputData.value.prod_price = prod_item?.prod_price;
        inputData.value.discount_price = prod_item?.discount_price;
        inputData.value.offer_price = prod_item?.offer_price;
        inputData.value.prod_stock = prod_item?.prod_stock;
        inputData.value.brand_name = prod_item?.brand_name;
        inputData.value.description = prod_item?.description;
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if(confirm(text) == true) {
            const result = await deleteProduct(id);
            if(result.data.deletedCount == 1) {
                alert("Product delete");
                const index = productList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    productList.value.splice(index, 1);
                }
            }
        }
    
    }
    catch(error) {
        console.log("Product delete", error);
    }
};

const handleResetInput = () => {
    inputData.value.id = null;
    inputData.value.parent_cat_info = null;
    inputData.value.sub_cat_info = null;
    inputData.value.sub_sub_cat_info = null;
    inputData.value.sub_sub_sub_cat_info = null;
    inputData.value.prod_type = null;
    inputData.value.prod_id = null;
    inputData.value.prod_image = null;
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
            <div v-for="(item, index) in productList" :key="index" class="col">
                <div class="card">


                    <img :src="item?.prod_image" class="card-img-top" alt="...">


                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title mt-3">{{ item?.prod_name }}</h5>
                            </div>

                            <div class="icon-style d-flex align-items-center mt-3">
                                <span @click="handleEdit(item)" class="material-icons me-2">
                                    edit
                                </span>
                                <span @click="handleDelete(item?._id)" class="material-icons">
                                    delete
                                </span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="card-text mb-0">Product id: {{ item.prod_id }}</p>
                            <p class="card-text mb-0">Product Type: {{ item.prod_type_name }}</p>
                            <p class="card-text mb-0">Brand: {{ item.brand_name }}</p>
                            
                        </div>
                        <p 
                        class="card-text mb-0">
                        Parent category: ({{ item?.parent_cat_id }}) - {{ item?.parent_cat_name }}
                        </p>
                        <p 
                        v-if="item.sub_cat_id" 
                        class="card-text mb-0">
                        Sub category: ({{ item?.sub_cat_id }}) - {{ item.sub_cat_name }}
                        </p>
                        <p 
                        v-if="item.sub_sub_cat_id" 
                        class="card-text mb-0">
                        Sub sub category: ({{ item?.sub_sub_cat_id }}) - {{ item.sub_sub_cat_name }}
                        </p>
                        <p 
                        v-if="item.sub_sub_sub_cat_id" 
                        class="card-text mb-0">
                        Sub sub sub category: ({{ item?.sub_sub_sub_cat_id }}) - {{ item.sub_sub_sub_cat_name }}
                        </p>


                        <div class="d-flex justify-content-between">
                            <p v-if="item.discount_price" class="card-text mb-0">Discount price: {{ item.discount_price }}</p>
                            <p v-if="item.offer_price" class="card-text mb-0">Offer price: {{ item.offer_price }}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="card-text mb-0">Product price: {{ item.prod_price }}</p>
                            <p class="card-text mb-0">Stock: {{ item.prod_stock }}</p>
                        </div>
                        
                        <p class="card-text mb-0">Description: {{ item.description }}</p>
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
                            <select @change="handleSubCategory" v-model="inputData.parent_cat_info"
                                :class="{ isValidate: isValidation && !inputData.parent_cat_info }"
                                class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in categoryList" :key="index" :value="item">
                                    ( {{ item?.parent_cat_id }} ) - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub category ID *
                            </label>
                            <select @change="handleSubSubCategory" v-model="inputData.sub_cat_info"
                                :class="{ isValidate: isValidation && !inputData.sub_cat_info }"
                                class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in subCategoryList" :key="index" :value="item">
                                    ( {{ item?.sub_cat_id }} ) - {{ item?.sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub sub category ID
                            </label>
                            <select @change="handleSubSubSubCategory" v-model="inputData.sub_sub_cat_info"
                                class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in subSubCategoryList" :key="index" :value="item">
                                    ( {{ item?.sub_sub_cat_id }} ) - {{ item?.sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub sub sub category ID
                            </label>
                            <select v-model="inputData.sub_sub_sub_cat_info" class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in subSubSubCategoryList" :key="index" :value="item">
                                    ( {{ item?.sub_sub_sub_cat_id }} ) - {{ item?.sub_sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Product Type *
                            </label>
                            <select v-model="inputData.prod_type"
                                :class="{ isValidate: isValidation && !inputData.prod_type }"
                                class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in productType" :key="index" :value="item">
                                    {{ item?.name }} - ( {{ item.type }} )
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product Category ID *
                            </label>
                            <input v-model="inputData.prod_id"
                                :class="{ isValidate: isValidation && !inputData.prod_id }" type="Number"
                                class="form-control" id="exampleInputText" placeholder="Product ID">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product image url *
                            </label>
                            <input v-model="inputData.prod_image"
                                :class="{ isValidate: isValidation && !inputData.prod_image }" type="url"
                                class="form-control" id="exampleInputText" placeholder="Product image">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product name *
                            </label>
                            <input v-model="inputData.prod_name"
                                :class="{ isValidate: isValidation && !inputData.prod_name }" type="text"
                                class="form-control" id="exampleInputText" placeholder="Product name">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Price *
                            </label>
                            <input v-model="inputData.prod_price"
                                :class="{ isValidate: isValidation && !inputData.prod_price }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Product price">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Stock *
                            </label>
                            <input v-model="inputData.prod_stock"
                                :class="{ isValidate: isValidation && !inputData.prod_stock }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Product stock">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand *
                            </label>
                            <input v-model="inputData.brand_name"
                                :class="{ isValidate: isValidation && !inputData.brand_name }" type="text"
                                class="form-control" id="exampleInputText" placeholder="Brand name">
                        </div>

                        <div class="col-md-12 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Description *
                            </label>
                            <textarea v-model="inputData.description"
                                :class="{ isValidate: isValidation && !inputData.description }" type="text"
                                class="form-control" id="exampleInputText" placeholder="Product description"></textarea>
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