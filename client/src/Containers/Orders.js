import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, setOrders } from "../Redux/Actions/orderActions";
import { fetchOrders } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const admin = localStorage.getItem("admin");

function Orders() {
    if (!admin) return <div className="pt-48 pl-4">You are not authorized</div>;

    const orders = useSelector((state) => state.allOrders.orders);
    const dispatch = useDispatch();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const navigate = useNavigate();

    const handleDelete = (orderId) => {
        setShowDeleteConfirmation(true);
        setSelectedOrderId(orderId);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteOrder(selectedOrderId, navigate));
        setShowDeleteConfirmation(false);
        toast("Order deleted!");
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    async function fetchProducts() {
        try {
            const response = await fetchOrders();
            dispatch(setOrders(response.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="px-8 flex flex-col mx-auto py-8 pt-48">
            <h2 className="text-2xl font-bold mb-4 min-w-[100%] text-white">Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {orders.map(
                    ({
                        _id,
                        productLink,
                        customerName,
                        customerNumber,
                        address,
                        price,
                    }) => (
                        <div
                            className="bg-white shadow border min-w-[290px] rounded p-4 relative"
                            key={_id}
                        >
                            <p>
                                Product:
                                <Link
                                    to={productLink}
                                    className="text-blue-500"
                                >
                                    View Product
                                </Link>
                            </p>
                            <p className="text-gray-600">
                                Customer Name: {customerName}
                            </p>
                            <p className="text-gray-600">
                                Customer Number: {customerNumber}
                            </p>
                            <p className="text-gray-600">
                                Customer Address: {address}
                            </p>
                            <p className="text-gray-600">Price: {price}</p>
                            <div className="absolute bottom-4 right-4">
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(_id)}
                                >
                                    <AiFillDelete size={24} />
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this order?
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
        </div>
    );
}

export default Orders;
