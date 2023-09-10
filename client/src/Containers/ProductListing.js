import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import { setProducts } from "../Redux/Actions/productActions";

function ProductListing() {
    const dispatch = useDispatch();
    const [cachedData, setCachedData] = useState(null);

    async function fetchProducts() {
        try {
            // Check if cached data is available
            const cachedResponse = localStorage.getItem("cachedProductsData");
            if (cachedResponse) {
                const parsedData = JSON.parse(cachedResponse);
                setCachedData(parsedData);
            }

            // Fetch fresh data from the API
            const response = await axios.get(
                "https://eprime-store-api.vercel.app/products"
            );

            // Update the cache with fresh data
            localStorage.setItem(
                "cachedProductsData",
                JSON.stringify(response.data.data)
            );

            // Update the Redux store with fresh data
            dispatch(setProducts(response.data.data));
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="main grid min-h-screen gap-4 px-4">
            {cachedData ? (
                <ProductComponent data={cachedData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductListing;
