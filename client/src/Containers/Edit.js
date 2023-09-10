import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    selectedProduct,
    removeSelectedProduct,
    updateProduct,
} from "../Redux/Actions/productActions";
import FileBase from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const admin = localStorage.getItem("admin");

function Edit() {
    if (!admin) return <div className="pt-48 pl-4">You are not authorized</div>;

    const product = useSelector((state) => state.allproducts.product);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, settitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    async function fetchProductDetail() {
        // Check if cached product data is available
        const cachedProduct = localStorage.getItem(
            `cachedProduct_${productId}`
        );
        if (cachedProduct) {
            const parsedProduct = JSON.parse(cachedProduct);
            dispatch(selectedProduct(parsedProduct));
        } else {
            const response = await axios
                .get(
                    `https://eprime-store-api.vercel.app/products/${productId}`
                )
                .catch((err) => {
                    console.log(err);
                });

            // Update the cache with fresh data
            localStorage.setItem(
                `cachedProduct_${productId}`,
                JSON.stringify(response.data)
            );

            dispatch(selectedProduct(response.data));
        }
    }

    useEffect(() => {
        if (productId && productId !== "") {
            fetchProductDetail();
        }

        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    useEffect(() => {
        if (product) {
            settitle(product.title);
            setPrice(product.price);
            setDescription(product.desc);
            setImage(product.image);
            setCategory(product.category);
        }
    }, [product]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const productData = {
            title,
            price,
            desc: description,
            image,
            category,
        };
        dispatch(updateProduct(product._id, productData, navigate));
        toast("Product Edited!");
    };

    return (
        <div className="detail">
            {Object.keys(product).length === 0 ? (
                <div className="mt-48">...loading</div>
            ) : (
                <div className="admin-page pt-48">
                    <h1>Edit Product</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Name:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Image:</label>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setImage(base64)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                            </select>
                        </div>
                        <button type="submit">Edit Product</button>
                    </form>
                    <ToastContainer />
                </div>
            )}
        </div>
    );
}

export default Edit;
