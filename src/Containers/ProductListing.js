import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../Redux/Actions/productActions';

function ProductListing() {
    const dispatch = useDispatch()

    async function fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products').catch((err) => {
            console.log("Err", err);
        })
        dispatch(setProducts(response.data))
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='container'>
            <ProductComponent/>
        </div>
    )
}

export default ProductListing