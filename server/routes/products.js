import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// חיבור ל־PostgreSQL
export const db = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fullstack_shop',
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false // ⚠️ חובה כדי שהחיבור יעבוד בענן (כמו Neon)
    }
});


const result = await db.query("SELECT NOW()");
console.log(result.rows[0]);

// GET ALL PRODUCTS FROM DB
router.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        console.log("Database ERROR: ", error);
        res.status(500).json({ error: 'Failed to fetch products-SERVER' });
    }
});


// CREATE NEW PRODUCT
router.post('/create', async (req, res) => {
    console.log("🛠 POST /create received:");
    console.log(req.body);

    try {
        const sql = `INSERT INTO products
    (id, title, brand, category, type, img1, img2, price, stock, description, isOnSale)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

        const values = [
            req.body.id,
            req.body.title,
            req.body.brand,
            req.body.category,
            req.body.type,
            req.body.img1,
            req.body.img2 || '',
            req.body.price,
            req.body.stock,
            req.body.description,
            req.body.isOnSale,
        ];

        const result = await db.query(sql, values);
        res.status(201).json({ message: 'Added New Product!', product: result.rows[0] });

    } catch (error) {
        console.log(error, "Error Insert new product!");
        res.status(500).json({ error: 'Error Insert new product! - SERVER' });
    }
});


// DELETE PRODUCT
router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await db.query(sql, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Product Not Found in DATABASE!!' });
        }

        res.status(200).json({ message: 'Product Deleted!!!', result: result.rows[0] });
    } catch (error) {
        console.log(error, "Error Delete Product!!!");
        res.status(500).json({ error: error.message });
    }
});


// UPDATE PRODUCT
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!id || !req.body.title || !req.body.brand || !req.body.category || !req.body.type || !req.body.img1
            || !req.body.price || !req.body.stock || !req.body.description) {
            return res.status(400).json({ error: 'MISSING PRODUCT DETAILS!!!!' });
        }

        const sql = `UPDATE products
    SET title = $1, brand = $2, category = $3, type = $4, img1 = $5, img2 = $6,
        price = $7, stock = $8, description = $9, isOnSale = $10
    WHERE id = $11
    RETURNING *`;

        const values = [
            req.body.title,
            req.body.brand,
            req.body.category,
            req.body.type,
            req.body.img1,
            req.body.img2,
            req.body.price,
            req.body.stock,
            req.body.description,
            req.body.isOnSale,
            id
        ];

        const result = await db.query(sql, values);
        res.status(200).json({ message: 'Product updated!!!', product: result.rows[0] });

    } catch (error) {
        console.log(error, "Error Updating Product!!!");
        res.status(500).json({ error: error.message });
    }
});




export default router