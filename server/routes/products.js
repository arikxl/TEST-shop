import express from 'express'

import mysql from 'mysql2/promise'



const router = express.Router()


// http://localhost/phpmyadmin/
const db = mysql.createPool({
    host: process.env.DB_HOST || 'test-server-re61.onrender.com',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fullstack-shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})



// GET ALL PRODUCTS FROM DB
router.get('/', async (req, res) => {
    try {

        const [products] = await db.query("SELECT * FROM products")
        res.json(products)
        console.log(products)
    } catch (error) {
        console.log("Database ERROR: ", error)
        res.status(500).json({ error: 'Failed to fetch products' })
    }
})



// CREATE NEW PRODUCT
router.post('/create', async (req, res) => {

    try {

        const sql = `INSERT INTO products
        ( id, title, brand, category, type, img1, img2, price, stock, description, isOnSale)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            req.body.id, req.body.title, req.body.brand, req.body.category, req.body.type, req.body.img1,
            req.body.img2, req.body.price, req.body.stock, req.body.description, req.body.isOnSale
        ];

        const [product] = await db.execute(sql, values);
        res.status(201).json({ message: 'Added New Product!', product });



    } catch (error) {
        console.log(error, "Error Insert new product!");
        res.status(500).json({ error: 'Error Insert new product! - SERVER' })
    }

})


// DELETE PRODUCT
router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const sql = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product Not Found in DATABASE!!' })

        res.status(200).json({ message: 'Product Deleted!!!', result })
    } catch (error) {
        console.log(error, "Error Delete Product!!!");
        res.status(500).json({ error: error.message });
    }

})



// UPDATE PRODUCT
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!id || !req.body.title || !req.body.brand || !req.body.category || !req.body.type || !req.body.img1
            || !req.body.price || !req.body.stock || !req.body.description) {
            res.status(400).json({ error: 'MISSING PRODUCT DETAILS!!!!' });
        }

        const sql = `UPDATE products
        SET title = ?, brand = ?, category = ?, type = ?, img1 = ?, img2 = ?, price = ?, stock = ?, description = ?, isOnSale = ?
        WHERE id = ?`;

        const values = [
            req.body.title, req.body.brand, req.body.category, req.body.type, req.body.img1,
            req.body.img2, req.body.price, req.body.stock, req.body.description, req.body.isOnSale, id
        ];

        const [product] = await db.execute(sql, values);
        res.status(200).json({ message: 'Product updated!!!', product })

    } catch (error) {
        console.log(error, "Error Updating Product!!!");
        res.status(500).json({ error: error.message });
    }

})






export default router