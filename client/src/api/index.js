import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("admin")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("admin")).token
        }`;
    }
    return req;
});

export const admin = (password) => API.post("admin", { password });

export const fetchPosts = () => API.get(`products`);

export const create = (product) => API.post("products/create", product);

export const remove = (id) => API.delete(`products/delete/${id}`);

export const update = (id, updatedProduct) =>
    API.put(`/products/update/${id}`, updatedProduct);

export const createOrder = (order) => API.post('orders', order);

export const fetchOrders = () => API.get(`orders`);

export const removeOrder = (id) => API.delete(`orders/${id}`);
