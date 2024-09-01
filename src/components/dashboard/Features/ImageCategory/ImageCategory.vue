<script setup>
import { ref, onMounted } from 'vue';
import { postImageCategory, getCategories, GetCatImg, deleteImageCategory } from '@/API/All_API.js';

const isValidation = ref(false);
const isEdit = ref(false);
const isModal = ref(false);
const categoryList = ref([]);
const subCatList = ref([]);
const categoryImgList = ref([]);
const inputData = ref({
    id: null,
    cat_name: null,
    parent_cat_id: null,
    sub_cat_id: null,
    img: '',
});

onMounted(() => {
    handleGetCategories();
    handleGetCatImg();
});

const handleCreate = () => {
    isModal.value = true;
    isEdit.value = false;
    resetInputData();
};

const handleClose = () => {
    isModal.value = false;
    isEdit.value = false;
    resetInputData()
};

const resetInputData = () => {
    inputData.value.id = null;
    inputData.value.cat_name = null;
    inputData.value.parent_cat_id = null;
    inputData.value.sub_cat_id = null;
    inputData.value.img = null;
};

const handleCancel = () => {
    resetInputData();
    isValidation.value = false;
    isEdit.value = false;
};

const handleGetCategories = async () => {
    try {
        const result = await getCategories();
        categoryList.value = result?.data;
    }
    catch (error) {
        console.log("Parent category list", error);
    }
};

const handleGetCatImg = async () => {
    try {
        const result = await GetCatImg();
        categoryImgList.value = result?.data;
    }
    catch (error) {
        console.log("get category image", error);
    }
};

const handleSubmit = async () => {
    try {
        const data = {
            _id: isEdit ? inputData.value.id : null,
            cat_name: inputData.value.cat_name,
            parent_cat_id: Number(inputData.value.parent_cat_id.parent_cat_id),
            sub_cat_id: Number(inputData.value.sub_cat_id.sub_cat_id),
            img: inputData.value.img,
        };

        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await postImageCategory(data);
            if (result.data.insertedId || result.data.modifiedCount == 1) {
                alert(result.data.insertedId ? 'Category added successful' : 'Update category info');
                resetInputData();
                isModal.value = false
            }
        }

    }
    catch (error) {
        console.log("Post Image Category handler", error);
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteImageCategory(id)
            if (result.data?.deletedCount == 1) {
                alert("Image category delete");
                const index = categoryImgList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    categoryImgList.value.splice(index, 1);
                }
            };
        };

    }
    catch (error) {
        console.log("Delete Img Cat", error);
    }
};

const handleEdit = (item) => {
    isEdit.value = true;
    isModal.value = true;
    if(isEdit) {
        inputData.value.id = item?._id;
        inputData.value.cat_name = item?.cat_name;
        inputData.value.img = item?.img;
        const parentCat = categoryList?.value.find((cat) => cat.parent_cat_id === item.parent_cat_id );
        inputData.value.parent_cat_id = parentCat;
        const subCat = parentCat.sub_cat_info;
        subCatList.value = item?.sub_cat_info
        inputData.value.sub_cat_id = subCat.find((subCat) => subCat.sub_cat_id == item.sub_cat_id);
        handleSubCategory();
    }
};

const handleSubCategory = () => {
    subCatList.value = inputData.value.parent_cat_id.sub_cat_info;
};

</script>

<template>
    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button 
            @click="handleCreate"
            type="button" 
            class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Image Category</button>
        </div>

        <!-- Image category list  -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
            <div v-for="(item, index) in categoryImgList" :key="index" class="col">
                <div class="card">
                    <div class="row">
                        <div class="col-md-3 image-style">
                            <img :src="item?.img" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body item-style">
                                <h5 class="card-title">{{ item?.cat_name }}</h5>
                                <p class="card-text mb-0">Parent Category: {{ item?.parent_cat_id }}</p>
                                <p class="card-text mb-0">Sub Category: {{ item?.sub_cat_id }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="icon-style d-flex align-items-center mt-3">
                                <span @click="handleEdit(item)" class="material-icons me-2">
                                    edit
                                </span>
                                <span @click="handleDelete(item?._id)" class="material-icons">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <!-- Add image Category Modal div  -->

        <div
      v-if="isModal"
      class="offcanvas offcanvas-end category-div show"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      style="visibility: visible; width: 100%;"
    >

            <div class="d-flex align-items-center">
                <button 
                @click="handleClose"
                type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title modal-title" id="offcanvasNavbarLabel">Add Image Category</h5>
            </div>

            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3 modal-title">Add image category</h5>
                    <div class="row g-4 input-group-style">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category Id *
                            </label>
                            <select v-model="inputData.parent_cat_id" @change="handleSubCategory"
                                :class="{ isValidate: isValidation && !inputData.parent_cat_id }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in categoryList" :key="index" :value="item">
                                    {{ item?.parent_cat_id }} - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub category id *
                            </label>
                            <select v-model="inputData.sub_cat_id"
                                :class="{ isValidate: isValidation && !inputData.sub_cat_id }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in subCatList" :key="index" :value="item">
                                    {{ item?.sub_cat_id }} - {{ item?.sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category image url *
                            </label>
                            <input v-model="inputData.img" :class="{ isValidate: isValidation && !inputData.img }"
                                type="url" class="form-control" id="exampleInputText" placeholder="Category image">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input v-model="inputData.cat_name"
                                :class="{ isValidate: isValidation && !inputData.cat_name }" type="text"
                                class="form-control" id="exampleInputText" placeholder="Category name">
                        </div>

                        <div class="submit-cancel-btn-style">
                            <button @click="handleCancel" type="button" class="cancel-style me-2">
                                Cancel
                            </button>
                            <button @click="handleSubmit" type="button" class="submit-style">
                                {{ isEdit ? 'Update' : 'Submit' }}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </section>
</template>

<style scoped src="./ImageCategory.css"></style>