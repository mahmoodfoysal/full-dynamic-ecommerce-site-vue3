import axios from "axios";

export const postRole = async (data) => {
    const url = 'http://localhost:5000/admin';
    return await axios.post(url, data);
};

export const getAdmin = async (data) => {
    const url = 'http://localhost:5000/admin';
    return await axios.get(url);
};