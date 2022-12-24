import { Card, CardMedia } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductComponent() {
    const products = useSelector((state) => state.allproducts.products);

    const renderList = products.map((product) => {
        const { id, title, image, price, category } = product;
        return (
            <Link to={`/product/${id}`} key={id}>
                <div className='col-md-3'>
                    <div className='card'>
                        <img className='card-img-top' src={image} alt={title}/>
                        <div className='card-body'>
                            <h5 className='card-title'> {title} </h5>
                            <h5 className='card-subtitle'> ${price} </h5>
                            <h6 className='card-subtitle text-muted'> {category} </h6>
                        </div>
                    </div>
                </div>
            </Link>
        );
    });

    return <>{renderList}</>;
}

export default ProductComponent;
