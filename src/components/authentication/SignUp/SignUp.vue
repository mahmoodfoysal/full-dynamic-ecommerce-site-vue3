<script setup>
import { RouterLink } from 'vue-router';
import { ref, watchEffect } from 'vue';
import router from '../../../router/router';
import { useStore } from '@/stores/TaskStore';
import initilizationAuthentication from '@/firebase/firebase.init.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

initilizationAuthentication();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// call pinia store and set in the store variable for access the store 
const store = useStore();

const getError = ref(null);
const fullName = ref('');
const phoneNo = ref(null);
const photoURL = ref('')
const email = ref('');
const password = ref('');
const isValidation = ref(false);

// event handler for registration 
const handleSignUp = () => {
    if(!fullName.value || !email.value || !password.value) {
        isValidation.value = true;
        alert("Fill up all required field!!");
        return;
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            // Update user profile
            updateProfile(user, {
                displayName: fullName.value,
                photoURL: photoURL.value,
                phoneNumber: phoneNo.value,
            })
            sessionStorage.setItem('kitkat-user', JSON.stringify(user));
            isValidation.value = false;
        })
        .catch((error) => {
            const errorMessage = error.message;
            getError.value = errorMessage;
            console.log(errorMessage)
        });

}

// google login with popup 
const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            store.setUser(user);
            sessionStorage.setItem('kitkat-user', JSON.stringify(user));
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

watchEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            router.push({ name: 'Home' })
            store.setUser(user);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
});

</script>

<template>
    <section class="login-section-style container">
        <div class="d-flex justify-content-center mb-3 pt-3 component-nav-style">
            <h4 class="me-5 text-primary">Registration</h4>
            <RouterLink :to="{name: 'Login'}" style="text-decoration: none; color: black;">
                <h4>Login</h4>
            </RouterLink>
        </div>
        <!-- login form section  -->
        <div class="form-control-style">
            <p class="text-center">Register New Account</p>
            <label for="name">Full Name *</label>
            <input 
            v-model.trim="fullName" 
            type="text" 
            :class="{'is-validate': isValidation && !fullName}"
            id="name" 
            placeholder="Enter Your Full Name">
            <label for="phone">Phone No</label>
            <input 
            v-model.number="phoneNo" 
            type="number"  
            id="phone" 
            placeholder="Enter Phone NO">
            <label for="photo">Photo Url</label>
            <input 
            v-model.trim="photoURL" 
            type="url"  
            id="photo" 
            placeholder="Give Photo URL">
            <label for="Login">Email *</label>
            <input 
            v-model.trim="email" 
            type="email" 
            :class="{'is-validate': isValidation && !email}" 
            id="Login" 
            placeholder="Enter Your Email">
            <label for="password">Password *</label>
            <input 
            v-model.trim="password" 
            type="password" 
            :class="{'is-validate': isValidation && !password}" 
            id="password" 
            placeholder="Enter Your Password">
            <div v-if="getError !== null" class="alert alert-danger" role="alert">
                {{ getError }}
            </div>
            <button @click="handleSignUp" type="button" class="register-btn">
                Sign Up
            </button>
            <h6 class="text-center or-text-style">Or</h6>
            <div class="text-center">
                <!-- google signin start -->
                <button @click="handleGoogleLogin" class="gsi-material-button">
                    <div class="gsi-material-button-state"></div>
                    <div class="gsi-material-button-content-wrapper">
                        <div class="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                                xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                                <path fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                </path>
                                <path fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                </path>
                                <path fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                </path>
                                <path fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                </path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span class="gsi-material-button-contents">Continue with Google</span>
                    </div>
                </button>
                <!-- google signin end -->
            </div>
            <p class="mt-3">Already Registered? please <RouterLink :to="{name: 'Login'}" style="text-decoration: none;">Login</RouterLink></p>
        </div>
    </section>
</template>

<style scoped>
.login-section-style {
    background: #F1F1F1;
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
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.form-control-style p,
label {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.component-nav-style h4 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    margin-top: 20px;
    cursor: pointer;
}

.form-control-style input:focus {
    border: 2px solid #1F5DA0 !important;
    outline: none;
}

.or-text-style {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.register-btn {
    height: 42px;
    width: 100%;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    background: #1F5DA0;
    color: #FFFFFF;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.register-btn:hover {
    background: #2D76C4;
    outline: #2D76C4;
}


/* google sign in start css code  */
.gsi-material-button {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-appearance: none;
    background-color: WHITE;
    background-image: none;
    border: 1px solid #747775;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #1f1f1f;
    cursor: pointer;
    font-family: 'Roboto', arial, sans-serif;
    font-size: 14px;
    height: 40px;
    letter-spacing: 0.25px;
    outline: none;
    overflow: hidden;
    padding: 0 12px;
    position: relative;
    text-align: center;
    -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
    transition: background-color .218s, border-color .218s, box-shadow .218s;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
    max-width: 400px;
    min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
    height: 20px;
    margin-right: 12px;
    min-width: 20px;
    width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
    -webkit-align-items: center;
    align-items: center;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: space-between;
    position: relative;
    width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.gsi-material-button .gsi-material-button-state {
    -webkit-transition: opacity .218s;
    transition: opacity .218s;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.gsi-material-button:disabled {
    cursor: default;
    background-color: #ffffff61;
    border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
    opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
    opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
    background-color: #303030;
    opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
    -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
    background-color: #303030;
    opacity: 8%;
}

.is-validate {
    border: 1px solid red !important;
}

/* google sign in end css code  */

@media only screen and (max-width: 2560px) {
    .login-section-style {
        max-width: 2300px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1920px) {
    .login-section-style {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1440px) {
    .login-section-style {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1024px) {
    .login-section-style {
        max-width: 950px !important;
        margin: auto;
        margin-top: 30px;
    }

}

@media only screen and (max-width: 768px) {
    .login-section-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }

}

@media only screen and (max-width: 540px) {
    .login-section-style {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }

    .form-control-style {
        box-sizing: border-box;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 42px 28px;
        margin: auto;
        border-radius: 10px;
        z-index: 22;
    }
}
</style>