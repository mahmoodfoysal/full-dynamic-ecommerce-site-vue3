<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';

const name = ref('');
const subject = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');

const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        phone: phone.value,
        message: message.value
    };

    console.log('Template Params:', templateParams); // Log form data for debugging

    emailjs.sendForm('service_8velmx9', 'template_a0wk1gc', e.target, 'Fxn081CAW6lcRjYKl')
        .then((result) => {
            console.log('Email sent successfully:', result.text);
            // Optionally reset form fields after successful submission
            name.value = '';
            subject.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
            // Call any function to indicate that the message has been sent
            messageSent();
        })
        .catch((error) => {
            console.error('Error sending email:', error.text);
        });
};

// Define the function to be called after the message is sent
const messageSent = () => {
    alert("Success")
};
</script>



<template>
    <!-- contact page section  -->
    <section class="contact-page">
        <div class="client-text">
            <span class="material-icons">
                handshake
            </span>
            <h4>Become Our Client</h4>
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Find Out More</button>
        </div>
    </section>

    <!-- modal  -->
    <section>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <section class="input-group-style">
                            <form @submit.prevent="sendEmail">
                                <input v-model="name" type="text" name="name" placeholder="Client Name">
                                <input v-model="email" type="email" name="email" placeholder="Email Address">
                                <input v-model="subject" type="text" name="subject" placeholder="Subject">
                                <input v-model="phone" type="number" name="phone" placeholder="Phone Number">
                                <textarea v-model="message" rows="3" cols="20" name="message" placeholder="Message"></textarea>
                                <div class="input-button-group-style">
                                    <button type="submit">Submit</button>
                                    <button type="button" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 p {
    margin: 0;
    padding: 0;
}

.contact-page {
    margin-top: 30px;
    background: #1F5DA0;
    padding-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
}

.client-text {
    text-align: center;
}

.client-text span {
    color: #FFF;
    font-size: 96px;
    font-weight: 500;
}

.client-text h4 {
    color: #FFF;
    font-size: 28px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-style: normal;

}

.client-text button {
    padding: 12px 22px;
    outline: none;
    border: 3px solid #FFF;
    background: #1F5DA0;
    color: #FFF;
    font-size: 18px;
    font-weight: 600;
    font-style: normal;
    border-radius: 30px;
    margin-top: 20px;
}

.client-text button:hover {
    background: #FFF;
    color: #1F5DA0;
    font-size: 18px;
    font-weight: 600;
    font-style: normal;
    cursor: pointer;
}

.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    color: var(--bs-modal-color);
    pointer-events: auto;
    background-color: var(--bs-modal-bg);
    background-clip: padding-box;
    border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
    border-radius: var(--bs-modal-border-radius);
    outline: 0;
    height: 440px !important;
    width: 635px !important;
    margin: auto;
    background: #1F5DA0 !important;
}

.modal-dialog {
    max-width: 635px !important;
    margin-right: auto;
    margin-left: auto;
}

.modal-header {
    border-bottom: 0px !important;
}

.modal-header button {
    color: #FFF !important;
}

.btn-close {
    color: #FFF !important;
}

.input-group-style input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    background: #FFF;
    outline: none;
    border: none;
    padding-left: 10px;
    border-radius: 2px;
    height: 35px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.input-group-style textarea {
    width: 100%;
    margin-bottom: 10px;
    background: #FFF;
    outline: none;
    border: none;
    padding-left: 10px;
    border-radius: 2px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.input-button-group-style {
    display: flex;
    justify-content: center;
}

.input-button-group-style button {
    padding: 4px 16px;
    border: 3px solid #FFF;
    background: #1F5DA0;
    border-radius: 10px;
    color: #FFF;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.input-button-group-style button:hover {
    background: #FFF;
    color: #1F5DA0;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.input-button-group-style button:first-child {
    margin-right: 5px;
}

.modal-header .btn-close {
    color: #FFFFFF !important;
}

@media only screen and (max-width: 540px) {
    .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        color: var(--bs-modal-color);
        pointer-events: auto;
        background-color: var(--bs-modal-bg);
        background-clip: padding-box;
        border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
        border-radius: var(--bs-modal-border-radius);
        outline: 0;
        height: 440px !important;
        width: 100% !important;
        margin: auto;
        background: #1F5DA0 !important;
    }
}
</style>