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
  const url = 'https://kitkat-ecommerce-server.onrender.com/squreCardForHome';
  return await axios.get(url);
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

// ######################## here write the dashboard some api ######################## 

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
 // post category
export const postCategory = async (data) => {
  const url = 'http://localhost:5000/categories';
  return await axios.post(url, data);
};
