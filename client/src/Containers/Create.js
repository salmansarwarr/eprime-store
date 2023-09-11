import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import "./create.scss";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../Redux/Actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const admin = localStorage.getItem("admin");

const Create = () => {
    const navigate = useNavigate();

    if (!admin)
        return (
            <div className="pt-48 pl-4 text-white">You are not authorized</div>
        );

    const dispatch = useDispatch();
    const [title, settitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const productData = {
            title,
            price,
            desc: description,
            images,
            category,
            outOfStock: false,
        };
        dispatch(createProduct(productData, navigate));
        toast("Product Created!");
        // Reset the form fields
        settitle("");
        setPrice(0);
        setDescription("");
        setCategory("");
        setImages([]);
    };

    return (
        <div className="admin-page w-full pt-48 text-black">
            <h1 className="bg-white w-fit p-2 rounded shadow">
                Add new Product
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label
                        htmlFor="title"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="text-black"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="price"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Price:
                    </label>
                    <input
                        type="number"
                        className="text-black"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Description:
                    </label>
                    <textarea
                        id="description"
                        className="text-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Image 1:
                    </label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setImages((prevImages) => [...prevImages, base64])
                        }
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Image 2:
                    </label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setImages((prevImages) => [...prevImages, base64])
                        }
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Image 3:
                    </label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setImages((prevImages) => [...prevImages, base64])
                        }
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Image 4:
                    </label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setImages((prevImages) => [...prevImages, base64])
                        }
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="description"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Image 5:
                    </label>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setImages((prevImages) => [...prevImages, base64])
                        }
                    />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="title"
                        className="bg-white w-fit p-2 rounded shadow"
                    >
                        Category:
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="text-black"
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="herbal">Herbal</option>
                        <option value="accessories">Accessories</option>
                        <option value="t-shirts">T Shirts</option>
                    </select>
                </div>
                <button type="submit">Add Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Create;
