import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../Redux/Actions/productActions';

function ProductListing() {
    const dispatch = useDispatch()

    async function fetchProducts() {
        const response = await axios.get('https://eprime-store-api.vercel.app/products').catch((err) => {
            console.log("Err", err);
        })
        dispatch(setProducts(response.data.data))
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='grid bg gap-4 px-4'>
            <ProductComponent/>
        </div>
    )
}

export default ProductListing