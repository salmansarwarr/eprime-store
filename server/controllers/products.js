import Product from "../models/Products.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });

        res.status(200).json({
            data: products,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    const newProduct = new Product({
        ...product,
    });

    try {
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    await Product.findByIdAndRemove(id);

    res.json({ message: 'Post deleted' });
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, image, desc, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = {
        image,
        title,
        desc,
        category,
        _id: id,
    };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
};
