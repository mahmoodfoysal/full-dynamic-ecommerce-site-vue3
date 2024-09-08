import axios from "axios";

// ######################## all get api ######################## 
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

export const GetCatImg = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/imageCategory';
  return await axios.get(url);
};

// get admin list 
export const getAdmin = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/admin';
  return await axios.get(url);
};

export const getPendingOrders = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/pending';
  return await axios.get(url);
};

export const getWarehouse = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/warehouse';
  return await axios.get(url);
};

export const getShipping = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/shipping';
  return await axios.get(url);
};

export const getDelivery = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/delivery';
  return await axios.get(url);
};

export const getSliderImage = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/slider-image';
  return await axios.get(url);
};

export const getOfferPoster = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/offer';
  return await axios.get(url);
};

export const getEvent = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/upcomming-events';
  return await axios.get(url);
};

export const getOrders = async () => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/orders';
  return await axios.get(url);
};

export const getOrdersByEmail = async (email) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/orders/${email}`;
  return await axios.get(url);
};


// ###################### all post operation are here ######################## 

// post image category 
export const postImageCategory = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/imageCategory';
  return await axios.post(url, data)
};
// post review
export const postReview = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/reviews';
  return await axios.post(url, data)
};

// post orders
export const createOrders = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/orders';
  return await axios.post(url, data);
};

// post admin for and role 
export const postRole = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/admin';
  return await axios.post(url, data);
};

 // post category
 export const postCategory = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/categories';
  return await axios.post(url, data);
};

export const postProduct = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/products';
  return await axios.post(url, data);
};

export const postsliderImage = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/slider-image';
  return await axios.post(url, data);
};

export const postOfferPoster = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/offer';
  return await axios.post(url, data);
};

export const postBrand = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/brands';
  return await axios.post(url, data);
};

export const postEvent = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/upcomming-events';
  return await axios.post(url, data);
};

export const updateOrderStatus = async (id, data) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/orders/${id}`;
  return await axios.patch(url, data);
};

export const updateStock = async (id, data) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/stock/${id}`;
  return await axios.patch(url, data);
};

export const updateStatus = async (id, data) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/status/${id}`;
  return await axios.patch(url, data);
}

// ###################### all delete operation are here ######################## 

// delete admin 
export const deleteAdmin = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/admin/${id}`;
  return await axios.delete(url);
};

// delete admin 
export const deleteImageCategory = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/imageCategory/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteProduct = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/products/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteOrders = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/orders/${id}`;
  return await axios.delete(url);
};

// delete product 
export const deleteSlider = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/slider-image/${id}`;
  return await axios.delete(url);
};

export const deleteOffer = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/offer/${id}`;
  return await axios.delete(url);
};

export const deleteBrand = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/brands/${id}`;
  return await axios.delete(url);
};

export const deleteEvent = async (id) => {
  const url = `https://kitkat-ecommerce-server.onrender.com/upcomming-events/${id}`;
  return await axios.delete(url);
};

