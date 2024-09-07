<script setup>
import { onMounted, ref, computed, toRefs } from 'vue';
import { getProducts, getCategories, postProduct, deleteProduct, updateStatus } from '@/API/All_API.js';

const props = defineProps({
    searchData: {
        type: String,
        default: ''
    }
});

const productList = ref([]);
const categoryList = ref([]);
const subCategoryList = ref([]);
const subSubCategoryList = ref([]);
const subSubSubCategoryList = ref([]);
const isModal = ref(false);
const isDetailsModal = ref(false)
const isValidation = ref(false);
const isEdit = ref(false);
const toggleField = ref(null);
const prodDetails = ref({});
const itemsPerPage = 16;
const page = ref(1);
const inputData = ref({
    id: null,
    parent_cat_info: null,
    sub_cat_info: null,
    sub_sub_cat_info: null,
    sub_sub_sub_cat_info: null,
    prod_type: null,
    pro_id: null,
    pro_image: '',
    pro_name: '',
    price: null,
    discount_price: null,
    offer_price: null,
    stock: null,
    brand: null,
    description: null,
    currency_type: null,
    status: null,
});

const {searchData} = toRefs(props);

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

const currencyList = [
    {
        currency_id: 301,
        currency_name: 'BDT',
    },
    {
        currency_id: 302,
        currency_name: 'USD',
    },
    {
        currency_id: 303,
        currency_name: 'EURO',
    },
    {
        currency_id: 304,
        currency_name: 'INR',
    },
];

const productStatus = [
    {
        id: 0,
        name: 'Inactive'
    },
    {
        id: 1,
        name: 'Active'
    }
];

onMounted(() => {
    handleGetProducts();
    handleGetCategories();
});

const handleCreate = () => {
    isModal.value = true;
    isValidation.value = false;
    isDetailsModal.value = false;
    handleResetInput();
};

const handleProductDetails = (item) => {
    prodDetails.value = item;
    isDetailsModal.value = true;
}

const handleCancel = () => {
    handleResetInput();
    isValidation.value = false;
};

const handleClose = () => {
    isModal.value = false;
    isValidation.value = false;
    handleResetInput();
}

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        productList.value = result?.data.map((mp, index) => ({...mp, sl:index + 1}));
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

        // add validation 
        isValidation.value = true;
        if(
            !inputData.value.parent_cat_info ||
            !inputData.value.sub_cat_info ||
            !inputData.value.pro_id ||
            !inputData.value.prod_type ||
            !inputData.value.pro_image ||
            !inputData.value.pro_name ||
            !inputData.value.status ||
            !inputData.value.price ||
            !inputData.value.currency_type ||
            !inputData.value.stock ||
            !inputData.value.stock
        ) {
            alert("Please fill up all the required fields");
            return;
        }
        if(
            inputData.value.prod_type.type == 'D' ? !inputData.value.discount_price : inputData.value.discount_price = null || inputData.value.prod_type.type == 'D' ? !inputData.value.offer_price : inputData.value.offer_price = null

        ) {
            alert("Please give offer or discount amount");
            return;
        }

        const data = {
            _id: isEdit ? inputData.value.id : null,

            parent_cat_id: Number(inputData.value.parent_cat_info.parent_cat_id),
            parent_cat_name: inputData.value.parent_cat_info.parent_cat_name,

            sub_cat_id: Number(inputData.value.sub_cat_info.sub_cat_id),
            sub_cat_name: inputData.value.sub_cat_info.sub_cat_name,

            sub_sub_cat_id: inputData.value.sub_sub_cat_info ? Number(inputData.value.sub_sub_cat_info.sub_sub_cat_id) : null,
            sub_sub_cat_name: inputData.value.sub_sub_cat_info ? inputData.value.sub_sub_cat_info.sub_sub_cat_name : null,

            sub_sub_sub_cat_id: inputData.value.sub_sub_sub_cat_info ? Number(inputData.value.sub_sub_sub_cat_info.sub_sub_sub_cat_id) : null,
            sub_sub_sub_cat_name: inputData.value.sub_sub_sub_cat_info ? inputData.value.sub_sub_sub_cat_info.sub_sub_sub_cat_name : null,

            prod_type_name: inputData.value.prod_type.name,
            prod_type: inputData.value.prod_type.type,
            pro_id: Number(inputData.value.pro_id),
            pro_image: inputData.value.pro_image,
            pro_name: inputData.value.pro_name,
            price: Number(inputData.value.price),
            discount_price: inputData.value.discount_price ? Number(inputData.value.discount_price) : null,
            offer_price: inputData.value.offer_price ? Number(inputData.value.offer_price) : null,
            stock: Number(inputData.value.stock),
            description: inputData.value.description,
            brand: inputData.value.brand,
            currency_id: Number(inputData.value.currency_type.currency_id),
            currency_name: inputData.value.currency_type.currency_name,
            status: inputData.value.status.id
        }

        const text = "Are you want to sure?";
        if (confirm(text) == true) {
            const result = await postProduct(data);
            if (result.data.insertedId || result.data.modifiedCount == 1) {
                alert(result.data.insertedId ? 'Product added successful' : 'Update product info');
                handleResetInput();
                isModal.value = false;
                isEdit.value = false;
                isValidation.value = false;
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
    if (isEdit) {
        inputData.value.id = prod_item._id;
        const findParentCat = categoryList?.value.find((item) => item.parent_cat_id === prod_item.parent_cat_id);
        inputData.value.parent_cat_info = findParentCat;

        const findSubCat = findParentCat?.sub_cat_info.find((item) => item.sub_cat_id === prod_item.sub_cat_id);
        handleSubCategory();
        inputData.value.sub_cat_info = findSubCat;


        const findSubSubCat = findSubCat?.sub_sub_cat_info.find((item) => item.sub_sub_cat_id == prod_item.sub_sub_cat_id);
        handleSubSubCategory();
        inputData.value.sub_sub_cat_info = findSubSubCat;


        if (prod_item.sub_sub_sub_cat_id) {
            const findSubSubSubCat = findSubSubCat.sub_sub_sub_cat_info.find((item) => item.sub_sub_sub_cat_id == prod_item.sub_sub_sub_cat_id);
            handleSubSubSubCategory();
            inputData.value.sub_sub_sub_cat_info = findSubSubSubCat;
        }

        inputData.value.prod_type = productType.find((item) => item.type == prod_item.prod_type);
        inputData.value.status = productStatus.find((item) => item?.id == prod_item.status);
        inputData.value.currency_type = currencyList.find((item) => item?.currency_id == prod_item?.currency_id)
        inputData.value.pro_id = prod_item?.pro_id;
        inputData.value.pro_image = prod_item?.pro_image;
        inputData.value.pro_name = prod_item?.pro_name;
        inputData.value.price = prod_item?.price;
        inputData.value.discount_price = prod_item?.discount_price;
        inputData.value.offer_price = prod_item?.offer_price;
        inputData.value.stock = prod_item?.stock;
        inputData.value.brand = prod_item?.brand;
        inputData.value.description = prod_item?.description;
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteProduct(id);
            if (result.data.deletedCount == 1) {
                alert("Product delete");
                const index = productList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    productList.value.splice(index, 1);
                }
            }
        }

    }
    catch (error) {
        console.log("Product delete", error);
    }
};

const totalPages = computed(() => Math.ceil(productList.value.length / itemsPerPage));

const paginationProducts = computed(() => {
    let filtered = filterSearchProducts.value;

    const startIndex = (page.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
});

const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
    }
};

const handleResetInput = () => {
    inputData.value.id = null;
    inputData.value.parent_cat_info = null;
    inputData.value.sub_cat_info = null;
    inputData.value.sub_sub_cat_info = null;
    inputData.value.sub_sub_sub_cat_info = null;
    inputData.value.prod_type = null;
    inputData.value.pro_id = null;
    inputData.value.pro_image = null;
    inputData.value.pro_name = null;
    inputData.value.price = null;
    inputData.value.discount_price = null;
    inputData.value.offer_price = null;
    inputData.value.stock = null;
    inputData.value.brand = null;
    inputData.value.description = null;
    inputData.value.currency_type = null;
};

const handleChangeProdType = () => {
    toggleField.value = inputData.value.prod_type.type
};

const handleUpdateStatus = async (id, status) => {
    try {
        const text = 'Are you want to sure?';
        if(confirm(text) == true) {
        const result = await updateStatus(id, {status: status});
        if(result.data.modifiedCount == 1) {
            alert("Status update");
        }
        }
    }
    catch(error) {
        console.log('status', error);
    }
};

const filterSearchProducts = computed(() => {
        return productList.value?.filter((item) =>
            Object.entries(item)
                .reduce(
                    (result, [, value]) =>
                        !(value instanceof Object) ? (result += ` ${value}`) : result,
                    ''
                )
                .toString()
                .toLowerCase()
                .includes(searchData.value.toString().toLowerCase())
        );
    });
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
        <!-- product table  -->
        <table class="table table-striped table-style">
            <thead>
                <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Details</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-if="productList.length === 0"
                    v-for="n in 8" :key="n">
                    <th scope="row">
                        <span class="placeholder col-12"></span>
                    </th>
                    <td>
                        <span class="placeholder col-12"></span>
                    </td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td class="order-details vertical-center">
                        <span class="placeholder col-12"></span>
                    </td>
                    <td>
                        <span class="placeholder col-12"></span>
                    </td>
                </tr>

                <tr v-for="(item, index) in paginationProducts" :key="index">
                    <!-- <th scope="row">{{ item.sl }}</th> -->
                    <th scope="row">{{index +((itemsPerPage*page) - 16) +1 }}</th>
                    <td>
                        <img style="width: 50px; 
                        height: 50px;" :src="item?.pro_image" alt="">
                    </td>
                    <td>{{ item?.pro_name }}</td>
                    <td>{{ item?.pro_id }}</td>
                    <td>{{ item?.prod_type }}</td>
                    <td>{{ item?.status== 1 ? 'Active' : 'Inactive' }}</td>
                    <td>{{ item?.stock }}</td>
                    <td>{{ item?.price }} {{ item?.currency_name }}</td>
                    <td class="order-details vertical-center">
                        <div 
                        @click="handleProductDetails(item)" 
                        class="d-flex align-items-center details">
                            <span class="material-icons me-1">
                                info
                            </span>
                            <span>
                                Details
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="icon-style d-flex align-items-center">
                            <span v-if="item.status == 1" 
                            @click="handleUpdateStatus(item?._id, 0)"
                            class="material-icons me-2 text-success">
                                visibility
                            </span>
                            <span 
                            v-if="item.status == 0"
                            @click="handleUpdateStatus(item?._id, 1)"
                            class="material-icons me-2 text-danger">
                            visibility_off
                            </span>
                            <span @click="handleEdit(item)" class="material-icons me-2">
                                edit
                            </span>
                            <span @click="handleDelete(item?._id)" class="material-icons">
                                delete
                            </span>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

        <div class="pagination-style mt-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li @click="goToPage(page - 1)" :disabled="page === 1" class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li @click="goToPage(1)" :disabled="page === 1" class="page-item"><a class="page-link"
                            href="#">1</a>
                    </li>
                    <li @click="goToPage(2)" :disabled="page === 2" class="page-item"><a class="page-link"
                            href="#">2</a>
                    </li>
                    <li @click="goToPage(3)" :disabled="page === 3" class="page-item"><a class="page-link"
                            href="#">3</a>
                    </li>
                    <li @click="goToPage(page + 1)" :disabled="page === totalPages" class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div v-if="isDetailsModal" class="offcanvas offcanvas-end details-div show" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" style="visibility: visible; width: 100%;">
            <div class="d-flex align-items-center">
                <button @click="isDetailsModal = false" type="button" class="btn-close me-2 ms-1"
                    data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Product Details</h5>
            </div>

            <div class="offcanvas-body">
                <!-- product details  -->
                <div class="row row-cols-1 row-cols-md-1 g-4 mt-2 mb-2">
                    <div class="col">
                        <div class="card">
                            <img :src="prodDetails?.pro_image" class="card-img-top" alt="...">
                            <div class="card-body">

                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 class="card-title mt-3">{{ prodDetails?.pro_name }}</h5>
                                    </div>

                                    <div class="icon-style d-flex align-items-center mt-3">
                                        <span @click="handleEdit(prodDetails)" class="material-icons me-2">
                                            edit
                                        </span>
                                        <span @click="handleDelete(prodDetails?._id)" class="material-icons">
                                            delete
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <p class="card-text mb-0">Product id: {{ prodDetails.pro_id }}</p>
                                    <p class="card-text mb-0">Product Type: {{ prodDetails.prod_type_name }}</p>
                                    <p class="card-text mb-0">Brand: {{ prodDetails.brand ? prodDetails.brand : 'No information about brand' }}</p>

                                </div>
                                <p class="card-text mb-0">
                                    Parent category: ({{ prodDetails?.parent_cat_id }}) - {{
                                    prodDetails?.parent_cat_name }}
                                </p>
                                <p v-if="prodDetails.sub_cat_id" class="card-text mb-0">
                                    Sub category: ({{ prodDetails?.sub_cat_id }}) - {{ prodDetails.sub_cat_name }}
                                </p>
                                <p v-if="prodDetails.sub_sub_cat_id" class="card-text mb-0">
                                    Sub sub category: ({{ prodDetails?.sub_sub_cat_id }}) - {{
                                    prodDetails.sub_sub_cat_name }}
                                </p>
                                <p v-if="prodDetails.sub_sub_sub_cat_id" class="card-text mb-0">
                                    Sub sub sub category: ({{ prodDetails?.sub_sub_sub_cat_id }}) - {{
                                    prodDetails.sub_sub_sub_cat_name }}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <p v-if="prodDetails.discount_price" class="card-text mb-0">Discount price: {{
                                        prodDetails.discount_price }}</p>
                                    <p v-if="prodDetails.offer_price" class="card-text mb-0">Offer price: {{
                                        prodDetails.offer_price }}</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <p class="card-text mb-0">Product price: 
                                        {{ prodDetails.price }} {{ prodDetails.currency_name }}
                                    </p>
                                    <p class="card-text mb-0">Stock: {{ prodDetails.stock }}</p>
                                </div>
                                <p class="card-text mb-0">Description: {{ prodDetails.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Add product modal  -->
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
                                Parent category id *
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
                                Sub category id *
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
                                Sub sub category id
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
                                Sub sub sub category id
                            </label>
                            <select v-model="inputData.sub_sub_sub_cat_info" class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in subSubSubCategoryList" :key="index" :value="item">
                                    ( {{ item?.sub_sub_sub_cat_id }} ) - {{ item?.sub_sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product id *
                            </label>
                            <input v-model="inputData.pro_id"
                                :class="{ isValidate: isValidation && !inputData.pro_id }" type="Number"
                                class="form-control" id="exampleInputText" placeholder="Product ID">
                        </div>

                        <div class="col-md-4 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Product type *
                            </label>
                            <select 
                                @change="handleChangeProdType"
                                v-model="inputData.prod_type"
                                :class="{ isValidate: isValidation && !inputData.prod_type }"
                                class="form-select form-select-md mb-1">
                                <option v-for="(item, index) in productType" :key="index" :value="item">
                                    ( {{ item.type }} ) - {{ item?.name }}
                                </option>
                            </select>
                        </div>


                        <div class="col-md-5 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product image url *
                            </label>
                            <input v-model="inputData.pro_image"
                                :class="{ isValidate: isValidation && !inputData.pro_image }" type="url"
                                class="form-control" id="exampleInputText" placeholder="Product image">
                        </div>

                        <div class="col-md-5 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Product name *
                            </label>
                            <input v-model="inputData.pro_name"
                                :class="{ isValidate: isValidation && !inputData.pro_name }" type="text"
                                class="form-control" id="exampleInputText" placeholder="Product name">
                        </div>

                        <div class="col-md-2 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Product status *
                            </label>
                            <select 
                            v-model="inputData.status"
                                :class="{ isValidate: isValidation && !inputData.status }"
                                class="form-select form-select-md mb-1">
                                <option 
                                v-for="(item, index) in productStatus" :key="index" 
                                :value="item">
                                    ( {{ item?.id }} ) - {{ item?.name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Price *
                            </label>
                            <input v-model="inputData.price"
                                :class="{ isValidate: isValidation && !inputData.price }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Product price">
                        </div>

                        <div class="col-md-3 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Currency type *
                            </label>
                            <select 
                            v-model="inputData.currency_type"
                                :class="{ isValidate: isValidation && !inputData.currency_type }"
                                class="form-select form-select-md mb-1">
                                <option 
                                v-for="(item, index) in currencyList" :key="index" 
                                :value="item">
                                    ( {{ item?.currency_id }} ) - {{ item?.currency_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-3 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Stock *
                            </label>
                            <input v-model="inputData.stock"
                                :class="{ isValidate: isValidation && !inputData.stock }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Product stock">
                        </div>

                        <div class="col-md-3 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand
                            </label>
                            <input v-model="inputData.brand"
                             type="text"
                                class="form-control" id="exampleInputText" placeholder="Brand name">
                        </div>

                        <div v-if="toggleField == 'D'" class="col-md-3 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Discount price *
                            </label>
                            <input v-model="inputData.discount_price"
                                :class="{ isValidate: isValidation && !inputData.discount_price }" type="Number"
                                class="form-control" id="exampleInputText" placeholder="Discount price">
                        </div>
                        <div v-if="toggleField == 'O'" class="col-md-3 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Offer price *
                            </label>
                            <input v-model="inputData.offer_price"
                                :class="{ isValidate: isValidation && !inputData.offer_price }" type="Number"
                                class="form-control" id="exampleInputText" placeholder="Offer price">
                        </div>


                        <div class="col-md-12 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Description
                            </label>
                            <textarea v-model="inputData.description"
                                 type="text"
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