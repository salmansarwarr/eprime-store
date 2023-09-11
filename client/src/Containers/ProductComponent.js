import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineStock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
    deleteProduct,
    markAsOutOfStock,
} from "../Redux/Actions/productActions";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const admin = JSON.parse(localStorage.getItem("admin"));

function ProductComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.allproducts.products);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [left, setLeft] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setLeft(open);
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="bg-white py-4"
        >
            <ul>
                {categories.map((text, index) => (
                    <li key={index} className="p-4 shadow">
                        <button
                            onClick={() => handleCategorySelect(text)}
                            className="capitalize text-blue-500 hover:text-blue-600"
                        >
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </Box>
    );

    const handleDelete = (productId) => {
        setShowDeleteConfirmation(true);
        setSelectedProductId(productId);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteProduct(selectedProductId, navigate));
        setShowDeleteConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleOutOfStock = (productId) => {
        const productToMarkOutOfStock = products.find(
            (p) => p._id === productId
        );
        if (productToMarkOutOfStock) {
            const { title, price, desc, images, category } =
                productToMarkOutOfStock;
            const productData = {
                title,
                price,
                desc,
                images,
                category,
                outOfStock: true,
            };
            dispatch(markAsOutOfStock(productId, productData, navigate));
            toast("Product marked as out of stock");
        } else {
            // Handle the case where the product with the specified _id is not found
            console.error("Product not found");
        }
    };

    const handleInStock = async (productId) => {
        const productToMarkInStock = products.find((p) => p._id === productId);
        if (productToMarkInStock) {
            const { title, price, desc, images, category } =
                productToMarkInStock;
            const productData = {
                title,
                price,
                desc,
                images,
                category,
                outOfStock: false,
            };
            dispatch(markAsOutOfStock(productId, productData, navigate));
            toast("Product marked as in stock");
        } else {
            // Handle the case where the product with the specified _id is not found
            console.error("Product not found");
        }
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedCategory || product.category === selectedCategory)
        );
    });

    const categories = ["herbal", "electronics", "accessories", "t-shirts"];

    const renderList = filteredProducts.map((product) => {
        const { _id, title, images, price, category, desc, outOfStock } =
            product;
        console.log(images);
        return (
            <div className=" py-4 px-4 mt-10 w-[250px]" key={_id}>
                <div className="card bg-gray-900 text-white shadow rounded">
                    <Link to={`/product/${_id}`}>
                        <img
                            className="card-img-top mt-3"
                            src={`${images[0]}`}
                            alt={title}
                        />
                    </Link>
                    <div className="max-w-[200px]">
                        <h5 className="text-[2rem] text-center my-4">
                            {title}
                        </h5>
                        <h5 className="text-white text-center">{price} PKR</h5>
                        <h5 className="text-gray-200 text-center my-4 whitespace-pre-wrap break-words">
                            {desc}
                        </h5>
                        <h6 className="text-gray-200 text-center text-muted my-2">
                            {category}
                        </h6>
                    </div>
                    {admin ? (
                        <div className="flex my-2 gap-2">
                            <button
                                className="btn px-4 bg-red-500 rounded"
                                onClick={() => handleDelete(_id)}
                            >
                                <AiOutlineDelete />
                            </button>
                            <button
                                className="btn px-4 bg-yellow-500 rounded"
                                onClick={() => navigate(`/edit/${_id}`)}
                            >
                                <AiOutlineEdit />
                            </button>
                            <button
                                className={`btn px-4 ${
                                    product.outOfStock
                                        ? "bg-red-800"
                                        : "bg-green-500"
                                } rounded`}
                                onClick={() =>
                                    product.outOfStock
                                        ? handleInStock(_id)
                                        : handleOutOfStock(_id)
                                }
                            >
                                <AiOutlineStock />
                            </button>
                        </div>
                    ) : (
                        <button
                            disabled={outOfStock}
                            className={`btn ${outOfStock && 'hover:text-white'} bg-green-300`}
                            onClick={() => navigate(`/create-order/${_id}`)}
                        >
                            {outOfStock ? 'Out of Stock' : 'Buy Now'}
                        </button>
                    )}
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="my-4 w-full mt-48 flex flex-col sm:flex-row justify-center">
                <div className="w-[35%]"></div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border h-16 border-gray-300 rounded px-4 py-2 md:w-[400px]"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className="sm:ml-auto sm:mr-4 md:mr-6">
                    <button
                        onClick={toggleDrawer(true)}
                        className="underline mt-4 text-white"
                    >
                        Categories
                    </button>
                    <SwipeableDrawer
                        anchor={"right"}
                        open={left}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list("left")}
                    </SwipeableDrawer>
                </div>
            </div>

            {/* PRODUCT LIST  */}
            {filteredProducts.length == 0 ? (
                <div className="text-white bg-transparent text-3xl mt-10 text-center">
                    Loading...
                </div>
            ) : (
                <div className="flex flex-wrap justify-center sm:justify-start">
                    {renderList}
                </div>
            )}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default ProductComponent;
