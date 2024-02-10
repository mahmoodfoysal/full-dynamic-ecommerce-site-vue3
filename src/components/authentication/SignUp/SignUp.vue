<script setup>
import { reactive, onMounted } from 'vue';
import {createRegistration} from '../../../../src/API/Authentication';
import router from '../../../router/router';
import { useStore } from '@/stores/TaskStore';

// call pinia store and set in the store variable for access the store 
const store = useStore();

// reactive registerData for v-model and sent to the database 
const registerData = reactive({
    fullName: '',
    phoneNumber: '',
    photoURL: '',
    email: '',
    password: ''
})

// event handler for registration 
const handleSignUp = async () => {
    // call the api and pass the parameter to the database file 
    await createRegistration(registerData);
    // find the user in the localstorage
    const userInfo = localStorage.getItem('user-info')
    // set the user info the pinia 
    store.setUser(JSON.parse(userInfo));
    // if user info tn the localStorage the redirect to the home page 
    if(userInfo) {
        router.push({name: 'Home'})
    }
    // cleare the registration field 
    registerData.fullName='';
    registerData.phoneNumber='';
    registerData.photoURL='';
    registerData.email='';
    registerData.password='';
}

// call the api for handle login 
onMounted(() => {
    // get the localstorage data 
    let userInfo = localStorage.getItem('user-info');
    // if local storage have user then redirect to the home page 
    if(userInfo) {
        router.push({name: 'Home'})
    }
})
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
            v-model.trim="registerData.fullName" 
            type="text" 
            name="" 
            id="name" 
            placeholder="Enter Your Full Name">
            <label for="phone">Phone No</label>
            <input 
            v-model.trim="registerData.phoneNumber"
            type="number" 
            name="" 
            id="phone" 
            placeholder="Enter Phone NO">
            <label for="photo">Photo Url</label>
            <input 
            v-model.trim="registerData.photoURL"
            type="url" 
            name="" 
            id="photo" 
            placeholder="Give Photo URL">
            <label for="Login">Email</label>
            <input 
            v-model.trim="registerData.email"
            type="email" 
            name="" 
            id="Login" 
            placeholder="Enter Your Email">
            <label for="password">Password</label>
            <input 
            v-model.trim="registerData.password"
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
    padding-left: 5px;
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