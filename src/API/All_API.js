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
  const url = 'http://localhost:5000/imageCategory';
  return await axios.get(url);
};

// get admin list 
export const getAdmin = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.get(url);
};


 // post category
export const postCategory = async (data) => {
  const url = 'http://localhost:5000/categories';
  return await axios.post(url, data);
};

// post image category 
export const postImageCategory = async (data) => {
  const url = 'http://localhost:5000/imageCategory';
  return await axios.post(url, data)
};

// ###################### all post operation are here ######################## 
export const postReview = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/reviews';
  return await axios.post(url, data)
};

export const createOrders = async (data) => {
  const url = 'https://kitkat-ecommerce-server.onrender.com/orders';
  return await axios.post(url, data);
};

// post admin for and role 
export const postRole = async (data) => {
  const url = 'http://localhost:5000/admin';
  return await axios.post(url, data);
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

