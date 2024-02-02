import { ref } from 'vue';
import axios from 'axios';
const authenticatinData = ref([]);
const error = ref([]);
const url = 'http://localhost:3000/users';

// event handler for registration 
export const createRegistration = async (registerData) => {
    authenticatinData.value = [];
    try {
        const config = {
            method: 'POST',
            url: url,
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(registerData)
        }
        const res = await axios(config);
        authenticatinData.value = res.data;

        if (res.status === 201) {
            alert("Successful")
            localStorage.setItem('user-info', JSON.stringify(registerData));
        }
        return authenticatinData
    }
    catch (err) {
        error.value = err.message
        // console.log(err);
    }

}

// event handler for login 
export const getLogin = async (loginData) => {
    const url = `http://localhost:3000/users?email=${loginData.email}&password=${loginData.password}`
    try {
        const res = await axios(url);
        const response = res.data[0];
        if(res.status === 200 && res.data.length > 0) {
            // store.setUser(JSON.stringify(response));
            localStorage.setItem('user-info', JSON.stringify(res.data[0]));
            // console.log(res);
            alert("Successfull");
            // console.log('pinia-store', store.user)
        }
    }
    catch(err) {

    }
}