const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getAllJewelry = async (limits, page, order_by) => {
    try {
        const offset = (page - 1) * limits;
        const result = await pool.query(`SELECT * FROM inventario ORDER BY ${order_by} LIMIT $1 OFFSET $2`, [limits, offset]);
        return result.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw new Error('Database query failed');
    }
};

const getFilteredJewelry = async (precio_min, precio_max, categoria, metal) => {
    try {
        const result = await pool.query(
            `SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria = $3 AND metal = $4`,
            [precio_min, precio_max, categoria, metal]
        );
        return result.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw new Error('Database query failed');
    }
};

module.exports = {
    getAllJewelry,
    getFilteredJewelry
};
