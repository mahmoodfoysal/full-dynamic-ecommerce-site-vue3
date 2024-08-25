<script setup>
import { onMounted, ref } from 'vue';
import { postCategory, getCategories } from '@/API/All_API.js';

const categories = ref([]);
const parentCategory = ref({
    parent_cat: null,
    parent_cat_name: null,
    parent_cat_id: null
});
const subCategory = ref({
    parent_cat: null,
    sub_cat_id: null,
    sub_cat_name: null
});
const subSubCategory = ref({
    parent_cat: null,
    sub_cat_id: null,
    sub_sub_cat_id: null,
    sub_sub_cat_name: null
})
const subSubSubCategory = ref({
    sub_sub_cat_id: null,
    sub_sub_sub_cat_id: null,
    sub_sub_sub_cat_name: null
})
const isValidation = ref(false);
const toggleCategoryTypeField = ref(0);
const subCategories = ref([])
const subSubCategories = ref([]);

onMounted(() => {
    handleGetCategories()
});

const handleGetCategories = async () => {
    try {
        const result = await getCategories();
        categories.value = result?.data;
    }
    catch(error) {
        console.log("categories", error)
    }
}

const handleResetInputValue = () => {
    parentCategory.value.parent_cat = null;
    parentCategory.value.parent_cat_name = null;
    parentCategory.value.parent_cat_id = null;
    subCategory.value.parent_cat = null;
    subCategory.value.sub_cat_id = null;
    subCategory.value.sub_cat_name = null;
    subSubCategory.value.parent_cat = null;
    subSubCategory.value.sub_cat_id = null;
    subSubCategory.value.sub_sub_cat_id = null;
    subSubCategory.value.sub_sub_cat_name = null;
    subSubSubCategory.value.sub_sub_cat_id = null;
    subSubSubCategory.value.sub_sub_sub_cat_id = null;
    subSubSubCategory.value.sub_sub_sub_cat_name = null;
};

const handleToggleCategory = (categoryType) => {
    toggleCategoryTypeField.value = categoryType
}
const handleCancel = () => {
    toggleCategoryTypeField.value = 0;
    handleResetInputValue();
    isValidation.value = false;
}

const changeParentCategory = () => {
    subCategories.value = subSubCategory.value.parent_cat.sub_cat_info
}

const changeSubSubCategory = () => {
    subSubCategories.value = subSubCategory.value.sub_cat_id.sub_sub_cat_info
}

const handlePostCategory = async (isCategoryType) => {
    let data;
    try {
        // parent category code 
        if (isCategoryType == 101) {
            if (!parentCategory.value.parent_cat_id || !parentCategory.value.parent_cat_name) {
                isValidation.value = true;
                alert("Please fill up all the required field");
                return;
            }

            data = {
                parent_cat_id: parseInt(parentCategory.value.parent_cat_id),
                parent_cat_name: parentCategory.value.parent_cat_name,
                sub_cat_info: [],
            }
        }

        // sub category code 
        if (isCategoryType == 102) {
            if (!subCategory.value.sub_cat_id || !subCategory.value.sub_cat_name) {
                isValidation.value = true;
                alert("Please fill up all the required field");
                return;
            }

            const newSubCategory = {
                sub_cat_id: Number(subCategory.value.sub_cat_id),
                sub_cat_name: subCategory.value.sub_cat_name,
                sub_sub_cat_info: []
            };

            const category = categories.value.find(cat => cat.parent_cat_id == subCategory.value.parent_cat.parent_cat_id);

            if (category) {
                category.sub_cat_info.push(newSubCategory);

                data = {
                    _id: category._id,
                    sub_cat_info: category.sub_cat_info
                };
            }

            else {
                data = {
                    _id: subCategory.value.parent_cat._id,
                    sub_cat_info: [newSubCategory]
                }
            }

        }

        // sub sub category code 
        if (isCategoryType == 103) {
            if (!subSubCategory.value.sub_sub_cat_id || !subSubCategory.value.sub_sub_cat_name || !subSubCategory.value.sub_sub_cat_id || !subSubCategory.value.sub_sub_cat_id) {
                isValidation.value = true;
                alert("Please fill up all the required field");
                return;
            }
            const newSubSubCat = {
                sub_sub_cat_id: Number(subSubCategory.value.sub_sub_cat_id),
                sub_sub_cat_name: subSubCategory.value.sub_sub_cat_name,
                sub_sub_sub_cat_info: []
            }
            const parentCategory = categories.value.find(parentCat => parentCat.parent_cat_id == subSubCategory.value.parent_cat.parent_cat_id);

            if (parentCategory) {
                const subCategory = parentCategory.sub_cat_info.find(subCat => subCat.sub_cat_id === subSubCategory.value.sub_cat_id.sub_cat_id);
                if (subCategory) {
                    subCategory.sub_sub_cat_info.push(newSubSubCat);
                    data = {
                        _id: parentCategory._id,
                        sub_cat_info: parentCategory.sub_cat_info
                    };
                }
                else {
                    alert("Sub-category not found. Please check your input.");
                    return;
                }
            }
        }

        if (isCategoryType == 104) {
            if (!subSubCategory.value.parent_cat ||
                !subSubCategory.value.sub_cat_id ||
                !subSubSubCategory.value.sub_sub_cat_id ||
                !subSubSubCategory.value.sub_sub_sub_cat_id ||
                !subSubSubCategory.value.sub_sub_sub_cat_name
            ) {
                isValidation.value = true;
                alert("Please fill up all the required field");
                return;
            }

            const newSubSubSubItems = {
                sub_sub_sub_cat_id: Number(subSubSubCategory.value.sub_sub_sub_cat_id),
                sub_sub_sub_cat_name: subSubSubCategory.value.sub_sub_sub_cat_name
            }
            const parentCategory = categories.value.find(parentCat => parentCat.parent_cat_id == subSubCategory.value.parent_cat.parent_cat_id);

            if (parentCategory) {
                const subCategory = parentCategory.sub_cat_info.find(subCat => subCat.sub_cat_id === subSubCategory.value.sub_cat_id.sub_cat_id);

                if (subCategory) {
                    const subSubCategory = subCategory.sub_sub_cat_info.find(
                        subSubCat => subSubCat.sub_sub_cat_id === subSubSubCategory.value.sub_sub_cat_id.sub_sub_cat_id
                    );
                    if (subSubCategory) {
                        subSubCategory.sub_sub_sub_cat_info.push(newSubSubSubItems);
                        data = {
                            _id: parentCategory._id,
                            sub_cat_info: parentCategory.sub_cat_info
                        }
                    }
                }
            }
        }

        // database sent files 
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await postCategory(data);
            if (result.data.insertedId || result.data.modifiedCount == 1) {
                alert(result.data.insertedId ? 'Category added successfull' : 'Update Category successful');
                isValidation.value = false;
                toggleCategoryTypeField.value = 0;
                handleResetInputValue();
                subCategories.value = []
                subSubCategories.value = [];
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};


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

        <!-- category list  -->
        <div class="row mt-2 g-4">
            <div class="col-md-6 column-style">
                <h3 class="text-center mt-2 mb-4">Parent Category</h3>
                <div v-for="(parentItem, parentIndex) in categories" :key="parentIndex">
                    <div class="d-flex align-items-center item-style">
                        <h5><span>{{ parentItem?.parent_cat_id }}</span> - <span>{{ parentItem?.parent_cat_name
                                }}</span></h5>
                        <span class="material-icons ms-2 edit">
                            edit
                        </span>
                        <span class="material-icons ms-2 delete">
                            delete
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-md-6 column-style">
                <h3 class="text-center mt-2 mb-4">Sub Category</h3>
                <div v-for="(parentItem, parentIndex) in categories" :key="parentIndex">
                    <div v-for="(subItem, subIndex) in parentItem?.sub_cat_info" :key="subIndex">
                        <div class="d-flex align-items-center item-style">
                            <h5><span>{{ subItem?.sub_cat_id }}</span> - <span>{{ subItem?.sub_cat_name
                                    }}</span></h5>
                            <span class="material-icons ms-2 edit">
                                edit
                            </span>
                            <span class="material-icons ms-2 delete">
                                delete
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 column-style">
                <h3 class="text-center mt-2 mb-4">Sub Category</h3>
                <div v-for="(parentItem, parentIndex) in categories" :key="parentIndex">
                    <div v-for="(subItem, subIndex) in parentItem?.sub_cat_info" :key="subIndex">
                        <div class="d-flex align-items-center item-style">
                            <h5><span>{{ subItem?.sub_cat_id }}</span> - <span>{{ subItem?.sub_cat_name
                                    }}</span></h5>
                            <span class="material-icons ms-2 edit">
                                edit
                            </span>
                            <span class="material-icons ms-2 delete">
                                delete
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 column-style">
                <h3 class="text-center mt-2 mb-4">Sub Sub Category</h3>
                <div v-for="(parentItem, parentIndex) in categories" :key="parentIndex">
                    <div v-for="(subItem, subIndex) in parentItem?.sub_cat_info" :key="subIndex">
                        <div
                        v-for="(subSubItem, subSubIndex) in subItem?.sub_sub_cat_info"
                        :key="subSubIndex"
                        >
                        <div
                        v-for="(subSubSubItem, subSubSubIndex) in subSubItem?.sub_sub_sub_cat_info"
                        :key="subSubSubIndex"
                        >
                        <div class="d-flex align-items-center item-style">
                            <h5><span>{{ subSubSubItem?.sub_sub_sub_cat_id }}</span> - <span>{{ subSubSubItem?.sub_sub_sub_cat_name
                                    }}</span></h5>
                            <span class="material-icons ms-2 edit">
                                edit
                            </span>
                            <span class="material-icons ms-2 delete">
                                delete
                            </span>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    <div class="col-md-2 category-btn-style" @click="handleToggleCategory(1)">
                        Parent Category
                    </div>
                    <div @click="handleToggleCategory(2)" class="col-md-2 category-btn-style">
                        Sub Category
                    </div>
                    <div @click="handleToggleCategory(3)" class="col-md-2 category-btn-style">
                        Sub Sub Category
                    </div>
                    <div @click="handleToggleCategory(4)" class="col-md-2 category-btn-style">
                        Sub Sub Sub Category
                    </div>
                    <div class="col-md-2">

                    </div>
                </div>

                <!-- modal input field  -->
                <section v-if="toggleCategoryTypeField == 1" class="parent-item">
                    <h5 class="text-center mt-3 mb-3">Add parent category</h5>
                    <div class="row g-4">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                ID *
                            </label>
                            <input v-model="parentCategory.parent_cat_id" type="number" class="form-control"
                                :class="{ isValidate: isValidation && !parentCategory.parent_cat_id }"
                                id="exampleInputEmail1" placeholder="Category id">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input v-model="parentCategory.parent_cat_name" type="text" class="form-control"
                                :class="{ isValidate: isValidation && !parentCategory.parent_cat_name }"
                                id="exampleInputEmail1" placeholder="Category name">
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handlePostCategory(101)" type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
                <!-- sub category field  -->
                <section v-if="toggleCategoryTypeField == 2" class="parent-item">
                    <h5 class="text-center mt-3 mb-3">Add sub category</h5>
                    <div class="row g-4">
                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category name *
                            </label>
                            <select v-model="subCategory.parent_cat"
                                :class="{ isValidate: isValidation && !subCategory.parent_cat }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in categories" :key="index" :value="item">
                                    {{ item?.parent_cat_id }} - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                ID *
                            </label>
                            <input v-model="subCategory.sub_cat_id" type="number" class="form-control"
                                :class="{ isValidate: isValidation && !subCategory.cat_id }" id="exampleInputEmail1"
                                placeholder="Category id">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input v-model="subCategory.sub_cat_name" type="text" class="form-control"
                                :class="{ isValidate: isValidation && !subCategory.cat_name }" id="exampleInputEmail1"
                                placeholder="Category name">
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handlePostCategory(102)" type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>

                <!-- sub sub category field  -->
                <section v-if="toggleCategoryTypeField == 3" class="parent-item">
                    <h5 class="text-center mt-3 mb-3">Add sub sub category</h5>
                    <div class="row g-4">
                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category name *
                            </label>
                            <select v-model="subSubCategory.parent_cat" @change="changeParentCategory"
                                :class="{ isValidate: isValidation && !subSubCategory.parent_cat }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in categories" :key="index" :value="item">
                                    {{ item?.parent_cat_id }} - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub Category *
                            </label>
                            <!-- <select v-model="subCategory.parent_cat"
                                :class="{ isValidate: isValidation && !subCategory.parent_cat }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">

                                <option disabled value="">Please Select Category</option>

                                <optgroup v-for="(item, index) in categories" :key="index"
                                    :label="item.parent_cat_name">
                                    <option v-for="(subItem, subIndex) in item.sub_cat_info" :key="subIndex"
                                        :value="subItem.sub_cat_name">
                                        {{ subItem.sub_cat_name }}
                                    </option>
                                </optgroup>

                            </select> -->

                            <select v-model="subSubCategory.sub_cat_id"
                                :class="{ isValidate: isValidation && !subSubCategory.sub_cat_id }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in subCategories" :key="index" :value="item">
                                    {{ item?.sub_cat_id }} - {{ item?.sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                ID *
                            </label>
                            <input v-model="subSubCategory.sub_sub_cat_id"
                                :class="{ isValidate: isValidation && !subSubCategory.sub_sub_cat_id }" type="number"
                                class="form-control" id="exampleInputEmail1" placeholder="Category id">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input v-model="subSubCategory.sub_sub_cat_name"
                                :class="{ isValidate: isValidation && !subSubCategory.sub_sub_cat_id }" type="text"
                                class="form-control" id="exampleInputEmail1" placeholder="Category name">
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handlePostCategory(103)" type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
                <!-- sub sub sub category  -->
                <section v-if="toggleCategoryTypeField == 4" class="parent-item">
                    <h5 class="text-center mt-3 mb-3">Add sub sub sub category</h5>
                    <div class="row g-4">
                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category name *
                            </label>
                            <select v-model="subSubCategory.parent_cat" @change="changeParentCategory"
                                :class="{ isValidate: isValidation && !subSubCategory.parent_cat }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in categories" :key="index" :value="item">
                                    {{ item?.parent_cat_id }} - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub Category *
                            </label>

                            <select v-model="subSubCategory.sub_cat_id" @change="changeSubSubCategory"
                                :class="{ isValidate: isValidation && !subSubCategory.sub_cat_id }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in subCategories" :key="index" :value="item">
                                    {{ item?.sub_cat_id }} - {{ item?.sub_cat_name }}
                                </option>
                            </select>

                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub sub category *
                            </label>

                            <select v-model="subSubSubCategory.sub_sub_cat_id"
                                :class="{ isValidate: isValidation && !subSubSubCategory.sub_sub_cat_id }"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in subSubCategories" :key="index" :value="item">
                                    {{ item?.sub_sub_cat_id }} - {{ item?.sub_sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                ID *
                            </label>
                            <input v-model="subSubSubCategory.sub_sub_sub_cat_id"
                                :class="{ isValidate: isValidation && !subSubSubCategory.sub_sub_sub_cat_id }"
                                type="number" class="form-control" id="exampleInputEmail1" placeholder="Category id">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input v-model="subSubSubCategory.sub_sub_sub_cat_name"
                                :class="{ isValidate: isValidation && !subSubSubCategory.sub_sub_sub_cat_name }"
                                type="text" class="form-control" id="exampleInputEmail1" placeholder="Category name">
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handlePostCategory(104)" type="button" class="btn btn-primary">
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