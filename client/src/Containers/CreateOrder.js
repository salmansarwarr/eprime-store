import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    selectedProduct,
    removeSelectedProduct,
} from "../Redux/Actions/productActions";
import { create_order } from "../Redux/Actions/orderActions";

const areas = [
    "Clifton",
    "Defence (DHA - Defence Housing Authority)",
    "Gulshan-e-Iqbal",
    "Gulistan-e-Johar",
    "Saddar",
    "Tariq Road",
    "PECHS (Pakistan Employees Cooperative Housing Society)",
    "North Nazimabad",
    "Nazimabad",
    "Gulshan-e-Maymar",
    "Malir",
    "Shah Faisal Colony",
    "Landhi",
    "Korangi",
    "Keamari",
    "Lyari",
    "Federal B. Area",
    "Orangi Town",
    "Liaquatabad",
    "Gulberg",
];

function OrderSuccessPopup({ onClose }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">
                    Order Created Successfully
                </h2>
                <p>
                    Your order has been placed successfully. You will receive
                    the product soon.
                </p>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

function CreateOrder() {
    const navigate = useNavigate();
    const product = useSelector((state) => state.allproducts.product);
    const { title, price, images, category, desc } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();

    const [customerName, setCustomerName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [area, setArea] = useState();
    const [address, setAddress] = useState();
    const [showPopup, setShowPopup] = useState(false);

    const calculateDeliveryFees = (selectedArea) => {
        const costPerKilometer = 10;
        const distances = {
            Clifton: 18,
            "Defence (DHA - Defence Housing Authority)": 12,
            "Gulshan-e-Iqbal": 5,
            "Gulistan-e-Johar": 0,
            Saddar: 15,
            "Tariq Road": 10,
            "PECHS (Pakistan Employees Cooperative Housing Society)": 9,
            "North Nazimabad": 10,
            Nazimabad: 10,
            "Gulshan-e-Maymar": 18,
            Malir: 17,
            "Shah Faisal Colony": 10,
            Landhi: 18,
            Korangi: 15,
            Keamari: 18,
            Lyari: 13,
            "Federal B. Area": 7,
            "Orangi Town": 14,
            Liaquatabad: 9,
            Gulberg: 11,
        };

        if (selectedArea && distances[selectedArea]) {
            return distances[selectedArea] * costPerKilometer;
        }

        return 0;
    };

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
            setCustomerName(localStorage.getItem("customerName") || "");
            setPhoneNumber(localStorage.getItem("phoneNumber") || "");
            setArea(localStorage.getItem("area") || "");
            setAddress(localStorage.getItem("address") || "");
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            productLink: `https://eprime-store.vercel.app/product/${productId}`,
            customerName,
            customerNumber: phoneNumber,
            address,
            price: price + calculateDeliveryFees(area),
        };
        dispatch(create_order(order));
        setShowPopup(true);

        // Store customer information in localStorage for future orders
        localStorage.setItem("customerName", customerName);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("area", area);
        localStorage.setItem("address", address);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate("/");
    };

    return (
        <div className="detail">
            {Object.keys(product).length === 0 ? (
                <div className="mt-48">Loading...</div>
            ) : (
                <div className="container mx-auto py-8 flex flex-col items-center">
                    <h2 className="text-5xl font-bold mb-6 text-white mt-48">
                        Create Order
                    </h2>
                    <div className="mb-6">
                        <p className="text-3xl text-white">{title}</p>
                    </div>
                    <div className="mb-6">
                        <img
                            src={images[0]}
                            alt={title}
                            className="w-64 h-auto rounded-lg"
                        />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-[300px] sm:w-[600px] text-white"
                    >
                        <div className="mb-6">
                            <label
                                htmlFor="customerName"
                                className="block text-xl text-white font-medium mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                className="border text-black border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-xl font-medium text-white mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="border text-black border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="area"
                                className="block text-xl font-medium text-whote mb-2"
                            >
                                Area
                            </label>
                            <select
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="border text-black border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select an area</option>
                                {areas.map((area) => (
                                    <option key={area} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="address"
                                className="block text-xl font-medium text-white mb-2"
                            >
                                Address
                            </label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border text-black border-gray-300 rounded-lg px-4 py-3 w-full resize-none focus:outline-none focus:border-blue-500"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6 font-semibold">
                            <p>Product Price: {price} PKR</p>
                        </div>
                        <div className="mb-6 font-semibold">
                            <p>
                                Delivery fees: {calculateDeliveryFees(area)} PKR
                            </p>
                        </div>

                        <div className="mb-6 font-semibold">
                            <p>
                                Total Price:{" "}
                                {price + calculateDeliveryFees(area)} PKR
                            </p>
                        </div>
                        <div className="mb-6 font-semibold">
                            <p>Payment type: Cash on Delivery</p>
                        </div>
                        <button
                            type="submit"
                            disabled={
                                !customerName ||
                                !phoneNumber ||
                                !area ||
                                !address
                            }
                            className="bg-blue-500 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Confirm Order
                        </button>
                    </form>
                    {showPopup && (
                        <OrderSuccessPopup onClose={handlePopupClose} />
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateOrder;
