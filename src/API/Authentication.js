import { ref } from 'vue';
import axios from 'axios';

const authenticatinData = ref([]);
const error = ref([]);
const url = 'http://localhost:3000/users';

// event handler for registration 
export const handleRegistration = async (registerData) => {
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
        console.log(err);
    }

}