<script setup>
import { ref, defineProps, toRef } from 'vue';
import { useStore } from '@/stores/TaskStore.js';
import { postReview } from '@/API/All_API.js';

const props = defineProps({
    productID: {
        type: Number,
        default: null
    }
});

const productID = toRef(props, 'productID');

const store = useStore();
const currentRating = ref(0);
const fullName = ref(store.user ? store.user.displayName : '');
const email = ref(store.user ? store.user.email : '');
const photo = ref(store.user ? store.user.photoURL : '');
const comment = ref(null);
const date = ref(Date());
const isValidation = ref(false);

const rate = (rating) => {
    currentRating.value = rating;
};

const handleSubmitReview = async () => {
    const review = {
        fullName: fullName.value,
        email: email.value,
        photo: photo.value,
        comment: comment.value,
        currentRating: currentRating.value,
        productID: productID.value,
        date: date.value
    };
    if (!fullName.value, !email.value) {
        isValidation.value = true;
        alert("Please login first");
        return;
    }
    else if (!comment.value, !currentRating.value) {
        isValidation.value = true;
        alert("Please fill all required field");
        return;
    }
    else {
        const text = "Are sure want to review?";
        if (confirm(text) == true) {
        const result = await postReview(review);
        if(result?.data) {
            alert("Review successfull");
        }
        isValidation.value = false;
        comment.value = '';
        currentRating.value = 0
    }
    }
}

</script>

<template>
    <form action="#">
        <h4 class="mb-5 fw-bold leave-review-text">Leave a Review</h4>
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="border-bottom rounded input-field-style">
                    <input v-model="fullName" type="text" :class="{ 'is-validate': isValidation && !fullName }"
                        class="form-control border-0 me-4" placeholder="Enter Your Full Name *" disabled required>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="border-bottom rounded input-field-style">
                    <input v-model="email" type="email" class="form-control border-0"
                        :class="{ 'is-validate': isValidation && !email }" placeholder="Enter Your Email *" disabled
                        required>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="border-bottom rounded my-4 input-field-style">
                    <textarea v-model="comment" class="form-control border-0"
                        :class="{ 'is-validate': isValidation && !comment }" cols="30" rows="8"
                        placeholder="Please Enter Your Valuable Comment *" spellcheck="false">
                    </textarea>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="d-flex justify-content-between py-3 mb-5">
                    <div class="d-flex align-items-center">
                        <p class="mb-0 me-3" :class="{ 'rating-check': isValidation && !currentRating }">Please rate: *
                        </p>
                        <div class="d-flex align-items-center rating-style" style="font-size: 12px;">
                            <i v-for="index in 5" :key="index" class="fa fa-star" :class="{
                                'star': index <= currentRating,
                                'star-o': index > currentRating
                            }" @click="rate(index)"></i>
                        </div>
                    </div>
                    <button @click="handleSubmitReview" type="button" class="btn-style">
                        Post Review
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
.rating-style {
    cursor: pointer;
}

.rating-style i:hover {
    cursor: pointer;
    color: #FFB524;
}

.star {
    color: gold;
}

.star-o {
    color: gray;
}

.text-yellow {
    color: #FFB524;
}

.text-gray {
    color: gray !important;
}


.leave-review-text {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
}

.input-field-style input,
textarea {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
}

.btn-style {
    border: 1px solid #1F5DA0;
    padding: 20px 30px;
    background-color: #FFFFFF;
    border-radius: 30px;
    color: #1F5DA0;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 15px;
    transition: 1000ms;
}

.btn-style:hover {
    border: 1px solid #1F5DA0;

    background-color: #1F5DA0;
    border-radius: 30px;
    color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 15px;
    transition: 1000ms;
}

.rating-check {
    color: red !important;
}

.is-validate {
    border: 1px solid red !important;
}
</style>