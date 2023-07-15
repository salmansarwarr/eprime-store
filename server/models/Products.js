import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    images: [String],
    desc: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Products', postSchema);

export default Product;