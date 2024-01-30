<script setup>
import { ref } from 'vue';

// all registration field ref are define here 
const fullName = ref('');
const phoneNumber = ref(null);
const photoURL = ref('');
const email = ref('');
const password = ref('');

const handleSignUp = () => {
    console.log("Fullname", fullName.value);
    console.log("Phoneno", phoneNumber.value);
    console.log("Photo URL", photoURL.value);
    console.log("Email", email.value);
    console.log("Password", password.value);
}
</script>

<template>
    <section class="login-section-style">
        <div class="d-flex justify-content-center mb-3 pt-3">
            <h4 class="me-5">Login</h4>
            <h4>Registration</h4>
        </div>
        <!-- login form section  -->
        <div class="form-control-style">
            <p class="text-center">Register New Account</p>
            <label for="name">Full Name</label>
            <input
            v-model="fullName" 
            type="text" 
            name="" 
            id="name" 
            placeholder="Enter Your Full Name">
            <label for="phone">Phone No</label>
            <input 
            v-model.number="phoneNumber"
            type="number" 
            name="" 
            id="phone" 
            placeholder="Enter Phone NO">
            <label for="photo">Photo Url</label>
            <input 
            v-model="photoURL"
            type="url" 
            name="" 
            id="photo" 
            placeholder="Give Photo URL">
            <label for="Login">Email</label>
            <input 
            v-model="email"
            type="email" 
            name="" 
            id="Login" 
            placeholder="Enter Your Email">
            <label for="password">Password</label>
            <input 
            v-model="password"
            type="password" 
            name="" 
            id="password" 
            placeholder="Enter Your Password">
            <button
            @click="handleSignUp" 
            type="button">
            Sign Up
            </button>

        </div>
    </section>
</template>

<style scoped>
.login-section-style {
    background: #F1F1F1;
    height: calc(100vh - 0px);
    width: 100%;
}

.form-control-style {
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 418px;
    padding: 30px 28px;
    margin: auto;
    border-radius: 10px;
    z-index: 22;
}

.form-control-style input {
    width: 100%;
    height: 42px;
    margin-bottom: 15px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
}

.form-control-style input:focus {
    border: 2px solid #1F5DA0 !important;
    outline: none;
}

.form-control-style button {
    height: 42px;
    width: 100%;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    background: #1F5DA0;
    color: #FFFFFF;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
}

.form-control-style button:hover {
    background: #2D76C4;
    outline: #2D76C4;
}
</style>