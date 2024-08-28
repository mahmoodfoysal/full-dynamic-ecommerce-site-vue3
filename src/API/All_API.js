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

