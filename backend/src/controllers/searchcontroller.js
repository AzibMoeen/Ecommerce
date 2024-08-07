import { Product } from "../models/products.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import mongoose from "mongoose";


    const searchProducts = asynchandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const products = await Product.aggregate([
        {
            $search: {
            index: 'default',
            text: {
                query: query,
                path: ['name', 'description','category'], 
                fuzzy: {
                maxEdits: 2,
                prefixLength: 3
                }
            }
            }
        }
        ]).exec(); 
        //(products);

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    });
    export { searchProducts };

