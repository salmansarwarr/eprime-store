import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import { setProducts } from "../Redux/Actions/productActions";

function ProductListing() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        try {
            // Fetch fresh data from the API
            const response = await axios.get(
                "https://eprime-store-api.vercel.app/products"
            );

            // Update the Redux store with fresh data
            dispatch(setProducts(response.data.data));

            // Update the component state with fresh data
            setData(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="main grid min-h-screen gap-4 px-4">
            {loading ? <p>Loading...</p> : <ProductComponent data={data} />}
        </div>
    );
}

export default ProductListing;
