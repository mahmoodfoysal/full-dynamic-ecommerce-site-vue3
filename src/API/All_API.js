import axios from "axios";
import {ref} from 'vue';

export default function getDataFromCentralApiFile() {
  // declare all ref for data store and reactive 
    const catImgData = ref([]);
    const categories = ref([]);
    const products = ref([]);
    const singleProduct = ref({});
    const brands = ref([]);
    const orders = ref([]);

    // get api for card category image for home page 
    const GetCatImg = async () => {
        catImgData.value = []
        const url = 'http://localhost:5000/squreCardForHome';
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

    // get all categories for navbar dropdown
    const getCategories = async () => {
        categories.value = [];
        const url = 'http://localhost:5000/categories';
        try {
            const res = await axios(url);
            // console.log(res.data);
            categories.value = res.data;
        }
        catch(err) {
            console.log(err);
        }
    };

    // get api for all products fetching 
    const getProducts = async () => {
      products.value = [];
      const url = 'http://localhost:5000/products';
      try {
        const res = await axios(url);
        products.value = res.data;
        // console.log(res.data);
      }
      catch(err) {
        console.log(err);
      }
    };

    // get api for home page brand sliding 
    const getBrands = async () => {
      brands.value = [];
      const url = 'http://localhost:5000/brands';
      try {
        const res = await axios(url);
        brands.value = res.data;
      }
      catch(err) {
        console.log(err);
      }
    };

    // this api for create order. when client place his order then store the data in the database 
    const createOrders = async (customerInfo) => {
      const url = 'http://localhost:5000/orders';
      orders.value = [];
      try {
        const config = {
          method: 'POST',
          url:url,
          headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify(customerInfo)
        }
        const res = await axios(config);
        orders.value = res.data;
        if(res.status === 200) {
          alert("Order Confirmed")
          localStorage.removeItem('shopping_cart')
        }
        
        return orders;
      }
      catch(err) {

      }
    }

    // return the all event handler and refs where store the response data 
    return {
        GetCatImg,
        getCategories,
        getProducts,
        getBrands,
        createOrders,
        catImgData,
        categories,
        products,
        brands,
        orders,
    }
}
