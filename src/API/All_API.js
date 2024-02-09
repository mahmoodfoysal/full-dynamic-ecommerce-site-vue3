import axios from "axios";
import {ref} from 'vue';

export default function getDataFromCentralApiFile() {
    const catImgData = ref([]);
    const categories = ref([]);
    const products = ref([]);
    const singleProduct = ref({});
    const brands = ref([]);
    const orders = ref([]);

    // get card image for home page 
    const GetCatImg = async () => {
        catImgData.value = []
        const url = 'http://localhost:3000/squreCartForHome';
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

    // get categories for navbar 
    const getCategories = async () => {
        categories.value = [];
        const url = 'http://localhost:3000/categories';
        try {
            const res = await axios(url);
            // console.log(res.data);
            categories.value = res.data;
        }
        catch(err) {
            console.log(err);
        }
    };

      // get parent category product 
    const getProducts = async () => {
      products.value = [];
      const url = 'http://localhost:3000/products';
      try {
        const res = await axios(url);
        products.value = res.data;
        // console.log(res.data);
      }
      catch(err) {
        console.log(err);
      }
    };

    // get single data for product details
    const getSingleProduct = async (id) => {
      singleProduct.value = [];
      const url = `http://localhost:3000/products?pro_id=${id}`;
      try {
        const res = await axios(url);
        singleProduct.value = res.data[0]
        console.log(res.data[0]);
      }
      catch(err) {

      }
    }

    // get brand item from api 
    const getBrands = async () => {
      brands.value = [];
      const url = 'http://localhost:3000/brand';
      try {
        const res = await axios(url);
        brands.value = res.data;
      }
      catch(err) {
        console.log(err);
      }
    };

    const createOrders = async (customerInfo) => {
      const url = 'http://localhost:3000/orders';
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
        if(res.status === 201) {
          alert("Order Confirmed")
          localStorage.removeItem('shopping_cart')
        }
        
        return orders;
      }
      catch(err) {

      }
    }

    return {
        GetCatImg,
        getCategories,
        getProducts,
        getBrands,
        createOrders,
        getSingleProduct,
        catImgData,
        categories,
        products,
        brands,
        orders,
        singleProduct
    }
}
