<script setup>
import { onMounted, ref } from 'vue';
import getDataFromCentralApiFile from '@/API/All_API.js';
import {postCategory} from '@/API/All_API.js';

const {getCategories ,categories} = getDataFromCentralApiFile();



const isValidation = ref(false);
const parentCategory = ref({
    parent_cat_name: null,
    parent_cat_id: null
});

const subCategory = ref({
    parent_cat: null,
    cat_name: null,
    cat_id: null
});
const parentCatToggle = ref(false);
const subCatToggle = ref(false);

onMounted(() => {
    getCategories();
});

const handlePostCategory = async () => {
    try {
        if(!parentCategory.value.parent_cat_id || !parentCategory.value.parent_cat_name) {
            isValidation.value = true;
            alert("Please fill up all the required field");
            
            return;
        }
        const data = {
            parent_cat_id: Number(parentCategory.value.parent_cat_id),
            parent_cat_name: parentCategory.value.parent_cat_name,
            sub_cat_info: [
    {
        sub_cat_id: null,
        sub_cat_name: null,
        sub_sub_cat_info: [
            {
                sub_sub_cat_id: null,
                sub_sub_cat_name: null,
                sub_sub_sub_cat_info: [
                    {
                        sub_sub_sub_cat_id: null,
                        sub_sub_sub_cat_name: null
                    }
                ]
            }
        ]
    }
    
    ]
        }
        const text = 'Are you want to sure?';
            if(confirm(text) == true) {
            const result = await postCategory(data);
            if(result.data.insertedId || result.data.modifiedCount == 1) {
            alert(result.data.insertedId ? 'Category added successfull' : 'Update Category successful');
            isValidation.value = false;
            parentCategory.value.parent_cat_id = null;
            parentCategory.value.parent_cat_name = null;
        }
        }


    }
    catch(error) {
        console.log(error);
    }
}

const handleParentCategory = () => {
    parentCatToggle.value = true;
    subCatToggle.value = false;
}

const handleSubCategory = () => {
    subCatToggle.value = true;
    parentCatToggle.value = false;
}

const handleCancel = () => {
    parentCatToggle.value = false;
    subCatToggle.value = false;
}
</script>

<template>
    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation" type="button" class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Category</button>
        </div>

        <!-- Add Category Modal div  -->

        <div class="offcanvas offcanvas-end category-div" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" data-bs-backdrop="false" data-bs-keyboard="false">
            <div class="d-flex align-items-center">
                <button type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Add Category</h5>
            </div>
            <div class="offcanvas-body">
                <!-- modal boday -->
                <div class="row gap-2 category-btn-group-style">
                    <div class="col-md-2">

                    </div>
                    <div 
                    class="col-md-2 category-btn-style"
                    @click="handleParentCategory"
                    >
                        Parent Category
                    </div>
                    <div 
                    @click="handleSubCategory"
                    class="col-md-2 category-btn-style">
                        Sub Category
                    </div>
                    <div class="col-md-2 category-btn-style">
                        Sub Sub Category
                    </div>
                    <div class="col-md-2 category-btn-style">
                        Sub Sub Sub Category
                    </div>
                    <div class="col-md-2">

                    </div>
                </div>
                <!-- modal input field  -->
                <section 
                v-if="parentCatToggle"
                class="parent-item">
                <h5 class="text-center mt-3 mb-3">Add parent category</h5>
                    <div class="row g-4">
                        <div class="col-md-6 mb-1">
                            <label 
                            for="exampleInputEmail1" 
                            class="form-label">
                                Category name *
                            </label>
                            <input 
                            v-model="parentCategory.parent_cat_name"
                            type="email" 
                            class="form-control"
                            :class="{ isValidate: isValidation && !parentCategory.parent_cat_name }" 
                            id="exampleInputEmail1"
                            placeholder="Category name"
                            aria-describedby="emailHelp">
                        </div>
                        <div class="col-md-6 mb-1">
                            <label 
                            for="exampleInputPassword1" 
                            class="form-label">
                                ID *
                            </label>
                            <input 
                            v-model="parentCategory.parent_cat_id"
                            type="email" 
                            class="form-control"
                            :class="{ isValidate: isValidation && !parentCategory.parent_cat_id }"
                            id="exampleInputEmail1"
                            placeholder="Category id"
                            aria-describedby="emailHelp">
                        </div>
                        <div>
                            <button 
                            @click="handleCancel"
                            type="button" 
                            class="btn btn-secondary me-2">
                            Cancel
                            </button>
                            <button 
                            @click="handlePostCategory"
                            type="button" 
                            class="btn btn-primary">
                            Submit
                            </button>
                        </div>
                    </div>
                </section>
                <!-- sub category field  -->
                <section 
                v-if="subCatToggle"
                class="parent-item">
                <h5 class="text-center mt-3 mb-3">Add sub category</h5>
                    <div class="row g-4">
                        <div class="col-md-6 mb-1">
                        <label 
                        for="exampleInputPassword1" 
                        class="form-label">
                        Parent category name *
                        </label>
                    <select 
                    v-model="subCategory.parent_cat"
                    :class="{ isValidate: isValidation && !subCategory.parent_cat }" 
                    class="form-select form-select-md mb-1"
                    placeholder="Please Select Category"
                    aria-label="form-select-md example">
                        <option
                        v-for="(item, index) in categories"
                        :key="index"
                        >
                        {{ item?.parent_cat_name }}
                        </option>
                    </select>
                    </div>
                        <div class="col-md-6 mb-1">
                            <label 
                            for="exampleInputEmail1" 
                            class="form-label">
                                Category name *
                            </label>
                            <input 
                            v-model="subCategory.cat_name"
                            type="email" 
                            class="form-control"
                            :class="{ isValidate: isValidation && !subCategory.cat_name }" 
                            id="exampleInputEmail1"
                            placeholder="Category name"
                            aria-describedby="emailHelp">
                        </div>
                        <div class="col-md-6 mb-1">
                            <label 
                            for="exampleInputPassword1" 
                            class="form-label">
                                ID *
                            </label>
                            <input 
                            v-model="subCategory.cat_id"
                            type="email" 
                            class="form-control"
                            :class="{ isValidate: isValidation && !subCategory.cat_id }"
                            id="exampleInputEmail1"
                            placeholder="Category id"
                            aria-describedby="emailHelp">
                        </div>
                        <div>
                            <button 
                            @click="handleCancel"
                            type="button" 
                            class="btn btn-secondary me-2">
                            Cancel
                            </button>
                            <button 
                            
                            type="button" 
                            class="btn btn-primary">
                            Submit
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </section>
</template>

<style scoped src="./Category.css">
.isValidate {
    border: 1px solid red !important;
}
</style>