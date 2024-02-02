import axios from "axios";
import {ref} from 'vue';

export default function getDataFromCentralApiFile() {
    const catImgData = ref([]);
    const handlerGetCatImg = async () => {
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
            console.log(randomCatImages);
          } 
          
          catch (err) {
            console.log(err);
          }
          
    }
    return {
        handlerGetCatImg,
        catImgData
    }
}
