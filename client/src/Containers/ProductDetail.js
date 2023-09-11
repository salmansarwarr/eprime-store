import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
    selectedProduct,
    removeSelectedProduct,
    deleteProduct,
} from "../Redux/Actions/productActions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const admin = JSON.parse(localStorage.getItem("admin"));

function ProductDetail() {
    const product = useSelector((state) => state.allproducts.product);
    const { title, price, images, category, desc, _id, outOfStock } = product;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteProduct(_id, navigate));
        setShowDeleteConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    async function fetchProductDetail() {
        // Check if cached data is available
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

    return (
        <div className="detail bg-gray-800 min-h-screen flex flex-col">
            {Object.keys(product).length === 0 ? (
                <div className="mt-48">...loading</div>
            ) : (
                <div className="container flex justify-center mt-48">
                    <Carousel className="max-w-[200px] sm:max-w-[500px] lg:max-w-[700px] mx-auto">
                        {images.map((image) => (
                            <img
                                src={image}
                                alt="image"
                                className="h-full w-full object-contain max-w-[180px] lg:max-w-[220px]"
                                key={image}
                            />
                        ))}
                    </Carousel>

                    <div className="text lg:mt-32">
                        <h1 className="text-4xl lg:text-6xl text-white font-bold mb-4">
                            {title}
                        </h1>
                        <div className="price">
                            <p className="text-2xl lg:text-4xl font-semibold">
                                {price} PKR
                            </p>
                        </div>
                        <h5 className=" text-white card-subtitle  my-4 whitespace-pre-wrap break-words">
                            {desc}
                        </h5>
                        <div className="category">
                            <p className="text-gray-500 text-2xl lg:text-3xl">
                                {category}
                            </p>
                        </div>
                        <p className="text-xl text-gray-700 mb-4">{desc}</p>
                        {admin ? (
                            <div className="flex my-2 gap-2">
                                <button
                                    className="btn px-4 bg-red-500 rounded"
                                    onClick={() => handleDelete()}
                                >
                                    <AiOutlineDelete />
                                </button>
                                <button
                                    className="btn px-4 bg-yellow-500 rounded"
                                    onClick={() => navigate(`/edit/${_id}`)}
                                >
                                    <AiOutlineEdit />
                                </button>
                            </div>
                        ) : (
                            <button
                                disabled={outOfStock}
                                className="btn lg:text-3xl bg-green-300 py-2 lg:py-3 px-4 lg:px-6 rounded-lg hover:bg-green-400 transition-all focus:outline-none focus:border-none"
                                onClick={() =>
                                    navigate(`/create-order/${productId}`)
                                }
                            >
                                {outOfStock ? "Out of Stock" : "Buy Now"}
                            </button>
                        )}
                    </div>
                    {showDeleteConfirmation && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md">
                                <h3 className="text-xl font-bold mb-4">
                                    Confirm Deletion
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to delete this
                                    product?
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
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
