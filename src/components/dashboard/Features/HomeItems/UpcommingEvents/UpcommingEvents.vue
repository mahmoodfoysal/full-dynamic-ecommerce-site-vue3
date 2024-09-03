<script setup>
import { ref, onMounted } from 'vue';
import { postEvent, getEvent, deleteEvent } from '@/API/All_API.js';

const inputData = ref({
    id: null,
    event_name: null,
    event_id: null,
    event_image: '',
});
const isValidation = ref(false);
const isModal = ref(false);
const eventList = ref([]);
const isEdit = ref(false);

const handleCreate = () => {
    isModal.value = true;
    isValidation.value = false;
    handleReset();
};

onMounted(() => {
    handleEvents();
})

const handleEvents = async () => {
    try {
        const result = await getEvent();
        eventList.value = result?.data;
    }
    catch (error) {
        console.log("Offer poster", error);
    }
};

const handleSubmit = async () => {
    try {
        isValidation.value = true;
        if(
            !inputData.value.event_id ||
            !inputData.value.event_name ||
            !inputData.value.event_image
        ) {
            alert("Please fill up all the required field");
            return;
        }
        const data = {
            _id: isEdit ? inputData?.value?.id : null,
            event_id: inputData.value.event_id,
            event_name: inputData.value.event_name,
            event_image: inputData.value.event_image,
        };
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await postEvent(data);
            if (result?.data?.insertedId || result?.data?.modifiedCount == 1) {
                alert(result?.data?.insertedId ? 'Data inserted successful!' : 'Data updated successful');
                handleReset();
                isModal.value = false;
                isValidation.value = false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const handleEdit = (item) => {
    isEdit.value = true;
    isModal.value = true;
    if (isEdit) {
        inputData.value.id = item?._id;
        inputData.value.event_id = item?.event_id;
        inputData.value.event_name = item?.event_name;
        inputData.value.event_image = item?.event_image;
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteEvent(id)
            if (result.data?.deletedCount == 1) {
                alert("Image category delete successful");
                const index = eventList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    eventList.value.splice(index, 1);
                }
            };
        };
    }
    catch (error) {
        console.log(error);
    }
};

const handleCancel = () => {
    handleReset();
    isEdit.value = false;
    isValidation.value = false;
};

const handleCloseModal = () => {
    isModal.value = false;
    isEdit.value = false;
    isValidation.value = false;
}

const handleReset = () => {
    inputData.value = {
        id: null,
        event_name: null,
        event_id: null,
        event_image: '',
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
                </span>Add Event</button>
        </div>

        <!-- Image category list  -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
            <div v-for="(item, index) in eventList" :key="index" class="col">
                <div class="card">
                    <div class="row">
                        <div class="col-md-3 image-style">
                            <img :src="item?.event_image" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <p class="card-text mb-0">Event Name: {{ item?.event_name }}</p>
                                <p class="card-text mb-0">Event ID: {{ item?.event_id }}</p>
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
                <button @click="handleCloseModal" type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title modal-title" id="offcanvasNavbarLabel">Add Event</h5>
            </div>

            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3 modal-title">Add Event</h5>
                    <div class="row g-4 input-group-style">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Event ID *
                            </label>
                            <input v-model="inputData.event_id"
                                :class="{ isValidate: isValidation && !inputData.event_id }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Event ID">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Event Name *
                            </label>
                            <input 
                            v-model="inputData.event_name" 
                            :class="{ isValidate: isValidation && !inputData.event_name }"
                            type="text" class="form-control" id="exampleInputText"
                                placeholder="Event name">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Event image *
                            </label>
                            <input v-model="inputData.event_image"
                                :class="{ isValidate: isValidation && !inputData.event_image }" type="url"
                                class="form-control" id="exampleInputText" placeholder="Event image">
                        </div>

                        <div class="submit-cancel-btn-style">
                            <button @click="handleCancel" type="button" class="cancel-style me-2">
                                Cancel
                            </button>
                            <button @click="handleSubmit" type="button" class="submit-style">
                                {{isEdit ? 'Update' : 'Submit'}}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<style scoped src="../../HomeItems/HomeItems.css"></style>