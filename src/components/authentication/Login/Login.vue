<script setup>
import {reactive, onMounted} from 'vue';
import {getLogin} from '../../../API/Authentication'
import router from '../../../router/router';
import {useStore} from '@/stores/TaskStore.js';
const store = useStore();
const loginData = reactive({
    email: '',
    password: ''
})

const handleLogin = async () => {
    await getLogin(loginData);
    const userInfo = localStorage.getItem('user-info')
    store.setUser(userInfo)
    if(userInfo) {
        router.push({name: 'Home'})
    }
}

onMounted(() => {
    let userInfo = localStorage.getItem('user-info');
    if(userInfo) {
        router.push({name: 'Home'})
    }
})


</script>

<template>
    <section class="login-section-style">
        <div class="d-flex justify-content-center mb-3 ">
            <h4 class="me-5">Login</h4>
            <h4>Registration</h4>
        </div>
        <!-- login form section  -->
        <div class="form-control-style">
            <p class="text-center">Login Your Account</p>
            <label for="Login">Email</label>
            <input
            v-model.trim="loginData.email" 
            type="email" 
            name="" 
            id="Login" 
            placeholder="Enter Your Email">

            <label for="password">Password</label>
            <input
            v-model.trim="loginData.password" 
            type="password" 
            name="" 
            id="password" 
            placeholder="Enter Your Password">
            <button
            @click="handleLogin" 
            type="button">
            Log In
            </button>

            <div class="forgot-pass-style">
                <span class="material-icons">
                    lock
                </span>
                 <p>Forgot Password</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.login-section-style {
    background: #F1F1F1;
    height: 100vh;
    width: 100%;
}

.form-control-style {
    box-sizing: border-box;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 418px;
    padding: 42px 28px;
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
    /* background: #2D76C4; */
    background: #1F5DA0;
    color: #FFFFFF;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
}

.form-control-style button:hover {
    background: #2D76C4;
    outline: #2D76C4;
}
.forgot-pass-style {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
</style>