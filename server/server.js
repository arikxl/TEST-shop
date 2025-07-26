import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import productsRoutes from './routes/products.js';


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();  // Load environment variables


app.use('/products', productsRoutes )

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
 })