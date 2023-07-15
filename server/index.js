import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js'
import adminRoutes from './routes/admin.js';
import orderRoutes from './routes/orders.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors());

app.get('/', (req, res) => res.send('App is running'));

app.use('/products', productRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', orderRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () =>
        console.log(`Server listening on port ${process.env.PORT}`)
    );
});