import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../Redux/Actions/productActions';

function ProductDetail() {
    const product = useSelector(state => state.allproducts.product)
    const { title, price, image, category, description } = product
    const { productId } = useParams()
    const dispatch = useDispatch()

    async function fetchProductDetail() {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            .catch((err) => {
                console.log(err);
            })

        dispatch(selectedProduct(response.data))
    }

    useEffect(() => {
        if (productId && productId !== "") {
            fetchProductDetail()
        }

        return (() => {
            dispatch(removeSelectedProduct())
        })
    }, [productId])

    return (
        <div className='detail'>
            {Object.keys(product).length === 0 ? (
                <div>...loading</div>
            ) : (
                <div className='container'>
                    <div className='image'>
                        <img src={image} />
                    </div>
                    <div className='text'>
                        <h1>{title}</h1>
                        <div className='price'>
                            <p>${price}</p>
                        </div>
                        <div className="category">
                            <p>{category}</p>
                        </div>
                        <p>
                            {description}
                        </p>
                        <button type="button" className="btn btn-danger btn-lg">Add to Cart</button>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default ProductDetail