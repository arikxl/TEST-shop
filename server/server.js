import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import productsRoutes from './routes/products.js';

dotenv.config();  // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/products', productsRoutes)

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})


console.log('Loaded env:', {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
});
