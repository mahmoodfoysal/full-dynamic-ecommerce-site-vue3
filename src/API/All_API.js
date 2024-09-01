import axios from "axios";

// ######################## all get api ######################## 
export const getCategories = async () => {
  const url = 'http://localhost:5000/categories';
  return await axios.get(url);
};

export const getProducts = async () => {
    const url = 'http://localhost:5000/products';
    return await axios.get(url);
};

export const getBrands = async () => {
  const url = 'http://localhost:5000/brands';
  return await axios.get(url);
};

export const getReviews = async () => {
  const url = 'http://localhost:5000/reviews';
  return await axios.get(url);
};

export const GetCatImg = async () => {
  const url = 'http://localhost:5000/imageCategory';
  return await axios.get(url);
};

// get admin list 
export const getAdmin = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.get(url);
};

export const getPendingOrders = async () => {
  const url = 'http://localhost:5000/pending';
  return await axios.get(url);
};

export const getWarehouse = async () => {
  const url = 'http://localhost:5000/warehouse';
  return await axios.get(url);
};

export const getShipping = async () => {
  const url = 'http://localhost:5000/shipping';
  return await axios.get(url);
};

export const getDelivery = async () => {
  const url = 'http://localhost:5000/delivery';
  return await axios.get(url);
};

export const getSliderImage = async () => {
  const url = 'http://localhost:5000/slider-image';
  return await axios.get(url);
};

export const getOfferPoster = async () => {
  const url = 'http://localhost:5000/offer';
  return await axios.get(url);
};

export const getEvent = async () => {
  const url = 'http://localhost:5000/upcomming-events';
  return await axios.get(url);
};


// ###################### all post operation are here ######################## 

// post image category 
export const postImageCategory = async (data) => {
  const url = 'http://localhost:5000/imageCategory';
  return await axios.post(url, data)
};
// post review
export const postReview = async (data) => {
  const url = 'http://localhost:5000/reviews';
  return await axios.post(url, data)
};

// post orders
export const createOrders = async (data) => {
  const url = 'http://localhost:5000/orders';
  return await axios.post(url, data);
};

// post admin for and role 
export const postRole = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.post(url, data);
};

 // post category
 export const postCategory = async (data) => {
  const url = 'http://localhost:5000/categories';
  return await axios.post(url, data);
};

export const postProduct = async (data) => {
  const url = 'http://localhost:5000/products';
  return await axios.post(url, data);
};

export const postsliderImage = async (data) => {
  const url = 'http://localhost:5000/slider-image';
  return await axios.post(url, data);
};

export const postOfferPoster = async (data) => {
  const url = 'http://localhost:5000/offer';
  return await axios.post(url, data);
};

export const postBrand = async (data) => {
  const url = 'http://localhost:5000/brands';
  return await axios.post(url, data);
};

export const postEvent = async (data) => {
  const url = 'http://localhost:5000/upcomming-events';
  return await axios.post(url, data);
};

export const updateOrderStatus = async (id, data) => {
  const url = `http://localhost:5000/orders/${id}`;
  return await axios.patch(url, data);
};

// ###################### all delete operation are here ######################## 

// delete admin 
export const deleteAdmin = async (id) => {
  const url = `http://localhost:5000/admin/${id}`;
  return await axios.delete(url);
};

// delete admin 
export const deleteImageCategory = async (id) => {
  const url = `http://localhost:5000/imageCategory/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteProduct = async (id) => {
  const url = `http://localhost:5000/products/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteOrders = async (id) => {
  const url = `http://localhost:5000/orders/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteSlider = async (id) => {
  const url = `http://localhost:5000/slider-image/${id}`;
  return await axios.delete(url);
};

export const deleteOffer = async (id) => {
  const url = `http://localhost:5000/offer/${id}`;
  return await axios.delete(url);
};

export const deleteBrand = async (id) => {
  const url = `http://localhost:5000/brands/${id}`;
  return await axios.delete(url);
};

export const deleteEvent = async (id) => {
  const url = `http://localhost:5000/upcomming-events/${id}`;
  return await axios.delete(url);
};

