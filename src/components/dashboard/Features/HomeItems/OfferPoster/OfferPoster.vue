<script setup>
import { ref, onMounted } from 'vue';
import { postOfferPoster, getOfferPoster, deleteOffer } from '@/API/All_API.js';

const inputData = ref({
    id: null,
    offer_id: null,
    offer_text: null,
    offer_image: '',
    currency_type: null,
    price: null,
});
const isValidation = ref(false);
const isModal = ref(false);
const offerImageList = ref([]);
const isEdit = ref(false);

const handleCreate = () => {
    isModal.value = true;
    handleReset();
};

onMounted(() => {
    handleGetOfferPoster();
})

const handleGetOfferPoster = async () => {
    try {
        const result = await getOfferPoster();
        offerImageList.value = result?.data;
    }
    catch(error) {
        console.log("Offer poster", error);
    }
};

const handleSubmit = async () => {
    try {
        const data = {
            _id: isEdit ? inputData?.value?.id : null,
            offer_id: inputData.value.offer_id,
            offer_text: inputData.value.offer_text,
            offer_image: inputData.value.offer_image,
            price: inputData.value.price,
            currency_type: inputData.value.currency_type
        };
        const text = 'Are you want to sure?';
        if(confirm(text) == true) {
            const result = await postOfferPoster(data);
        if(result?.data?.insertedId || result?.data?.matchedCount) {
            alert(result?.data?.insertedId ?'Data inserted successful!' : 'Data updated successful');
            handleReset();
            isModal.value = flase;
        }
        }
    }
    catch(error) {
        console.log(error);
    }
};

const handleEdit = (item) => {
    isEdit.value = true;
    isModal.value = true;
    if(isEdit) {
        inputData.value.id = item?._id;
        inputData.value.offer_id = item?.offer_id;
        inputData.value.offer_text = item?.offer_text;
        inputData.value.offer_image = item?.offer_image;
        inputData.value.price = item?.price;
        inputData.value.currency_type = item?.currency_type;
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteOffer(id)
            if (result.data?.deletedCount == 1) {
                alert("Image category delete successful");
                const index = offerImageList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    offerImageList.value.splice(index, 1);
                }
            };
        };
    }
    catch(error) {
        console.log(error);
    }
};

const handleCancel = () => {
    handleReset()
};

const handleReset = () => {
    inputData.value = {
        offer_id: null,
        offer_text: null,
        offer_image: '',
        offer: null,
        price: null,
    }
};
</script>

<template>

    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button @click="handleCreate" type="button" class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Slider</button>
        </div>

        <!-- Image category list  -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
            <div 
            v-for="(item, index) in offerImageList" 
            :key="index" 
            class="col">
                <div class="card">
                    <div class="row">
                        <div class="col-md-3 image-style">
                            <img :src="item?.offer_image" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <p class="card-text mb-0">Text: {{ item?.offer_text }}</p>
                                <p class="card-text mb-0">Price: {{ item?.price }}</p>
                                <p class="card-text mb-0">Currency Type: {{ item?.currency_type }}</p>
                                <p class="card-text mb-0">Offer ID: {{ item?.offer_id }}</p>
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

        <div v-if="isModal" class="offcanvas offcanvas-end category-div show" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" style="visibility: visible; width: 100%;">

            <div class="d-flex align-items-center">
                <button @click="isModal = false" type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Create Offer</h5>
            </div>

            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3">Create Offer</h5>
                    <div class="row g-4">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Offer ID *
                            </label>
                            <input v-model="inputData.offer_id"
                                :class="{ isValidate: isValidation && !inputData.offer_id }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Slider ID">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Offer Text
                            </label>
                            <input v-model="inputData.offer_text" type="text" class="form-control"
                                id="exampleInputText" placeholder="Slider text">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Offer image *
                            </label>
                            <input 
                            v-model="inputData.offer_image"
                            :class="{ isValidate: isValidation && !inputData.offer_image }" 
                            type="url"
                            class="form-control" 
                            id="exampleInputText" 
                            placeholder="Slider image">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Price
                            </label>
                            <input 
                            v-model="inputData.price" 
                            type="number" 
                            class="form-control" id="exampleInputText"
                            placeholder="Enter price">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Currency Type
                            </label>
                            <select v-model="inputData.currency_type"
                            class="form-select form-select-md mb-1" 
                            placeholder="Please Select Category">
                                <option value="TAKA">TAKA</option>
                                <option value="EURO">EURO</option>
                                <option value="DOLLAR">DOLLAR</option>
                                <option value="INR">INR</option>
                            </select>
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

<style scoped src="../../HomeItems/HomeItems.css"></style>