const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {Category} = require('../models/category');

// retrieve back the product    
router.get(`/`, async (req, res) => {
    const products = await Product.find();

    if (!products) {
        res.status(404).json({
            error: "Product not found",
            success: false
        });
    } else {
        res.send(products);
    }
});

// create product
router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).json({ message: "Category not found" });

    try {
        const product = await Product.create(req.body);
        if (!product) {
            res.status(404).json({
                error: "Product not found",
                success: false
            });
        } else {
            res.status(201).json({
                message: "Product created successfully",
                success: true,
                product
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            success: false
        });
    }
});

module.exports = router;
