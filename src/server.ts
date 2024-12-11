import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import { errorHandler } from './shared/errors/ErrorHandler'
import { AuthenticationError } from './shared/errors/AuthenticationError'
import  categoryRoutes from './routes/categoryRoutes'
import  cartRoutes from './routes/cartRoutes'
import  productRoutes from './routes/productRoutes'
import  userRoutes from './routes/userRoutes'
import  priceRangeRoutes from './routes/priceRangeRoutes'
import seedCategory from './seed/categorySeed'
import seedPriceRange from './seed/priceRangeSeed'
import seedProduct from './seed/productosSeed'
import session from 'express-session';
dotenv.config()
connectDB();

const app = express()
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.CLAVE_PASSPORT,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/price-range", priceRangeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.get('/error', (req, res, next) => {
    const error = new AuthenticationError(
      'You are not authorized to access this resource',
    );
    next(error);
});
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});
  
app.use(errorHandler);

export default app
