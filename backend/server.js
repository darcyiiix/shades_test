import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import cors from 'cors'

dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 8000;

connectDB() // Connect to mongodb

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors('*'))




app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/images', imageRoutes);

app.use('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
});


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
});
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))