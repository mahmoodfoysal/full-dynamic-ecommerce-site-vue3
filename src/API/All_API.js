import axios from "axios";
import {ref} from 'vue';

export default function getDataFromCentralApiFile() {
    const catImgData = ref([]);
    // get api for card category image for home page 
    const GetCatImg = async () => {
        catImgData.value = []
        const url = 'https://kitkat-ecommerce-server.onrender.com/squreCardForHome';
        try {
            const res = await axios(url);
            const allCatImages = res.data;
    
            const getRandomItems = (array, count) => {
              const shuffled = array.slice(0);
              let i = array.length;
              let temp, index;
    
              while (i--) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[i];
                shuffled[i] = shuffled[index];
                shuffled[index] = temp;
              }
    
              return shuffled.slice(0, count);
            };
            const randomCatImages = getRandomItems(allCatImages, 4);
            catImgData.value = randomCatImages
            // console.log(randomCatImages);
          } 
          
          catch (err) {
            console.log(err);
          }
    };

    return {
        GetCatImg,
        catImgData,
    }
}

// all post operation are here 
export const postReview = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/reviews';
  return await axios.post(url, data)
};

export const createOrders = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/orders';
  return await axios.post(url, data);
};

// all get api 
export const getCategories = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/categories';
  return await axios.get(url);
};

export const getProducts = async () => {
    const url = 'https://kitkat-ecommerce-server.onrender.com/products';
    return await axios.get(url);
};

export const getBrands = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/brands';
  return await axios.get(url);
};

export const getReviews = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/reviews';
  return await axios.get(url);
};

// here write the dashboard some api 

// post admin for and role 
export const postRole = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.post(url, data);
};

// get admin list 
export const getAdmin = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.get(url);
};

// delete admin 
export const deleteAdmin = async (id) => {
  const url = `http://localhost:5000/admin/${id}`;
  return await axios.delete(url);
}

export const postCategory = async (data) => {
  const url = 'http://localhost:5000/categories';
  return await axios.post(url, data);
};
