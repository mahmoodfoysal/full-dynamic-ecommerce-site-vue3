import axios from "axios";
import {ref} from 'vue';

export default function getDataFromCentralApiFile() {
    const catImgData = ref([]);
    const categories = ref([]);
    const products = ref([]);
    const brands = ref([]);

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
          
    }

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
    }

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
    }

    return {
        GetCatImg,
        getCategories,
        getProducts,
        getBrands,
        catImgData,
        categories,
        products,
        brands
    }
}
