const { getAllJewelry, getFilteredJewelry } = require('../models/jewelryModel');

const getJewelry = async (req, res) => {
    try {
        const { limits, page, order_by } = req.query;

        // Agregar validaciones para los parámetros
        if (!limits || !page || !order_by) {
            return res.status(400).json({ error: 'Missing query parameters: limits, page, or order_by' });
        }

        const jewelry = await getAllJewelry(limits, page, order_by);
        res.json(jewelry);
    } catch (err) {
        console.error(err);  // Registro del error en el servidor
        res.status(500).json({ error: err.message });
    }
};

const getJewelryByFilters = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;
        const jewelry = await getFilteredJewelry(precio_min, precio_max, categoria, metal);
        res.json(jewelry);
    } catch (err) {
        console.error(err);  // Registro del error en el servidor
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getJewelry,
    getJewelryByFilters
};
