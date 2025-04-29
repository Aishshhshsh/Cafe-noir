const express = require("express");
const router = express.Router();

// Import the Product model
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); // Returns the list of products
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
});

// Create a new product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct); // Return the created product
    } catch (error) {
        res.status(400).json({ message: "Error adding product", error });
    }
});

module.exports = router;
