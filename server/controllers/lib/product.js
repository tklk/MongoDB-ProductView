//const Item = require('../../models/itemModel');
const Product = require('../../models/productModel');

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

function validProduct(req, res) {
    if (!req.body.title) {
        return handleError(res, "Invalid user input: name", "Must provide a product name.", 400);
    }
    if (!req.body.price || req.body.price < 0) {
        return handleError(res, "Invalid user input: price", "Must provide a valid price.", 400);
    }
    if (!req.body.description) {
        return handleError(res, "Invalid user input: description", "Must provide a product description.", 400);
    }
    if (!req.body.imageUrl) {
        return handleError(res, "Invalid user input: url", "Must provide a product url.", 400);
    }
    return true;
}

exports.getList = async (req, res, next) => {
    try {
        const prods = await Product.find();
        let Arr = Object.entries(prods);        
        let prodsArray = [];
        Arr.forEach((elem) => {
            prodsArray.push(Object.values(elem)[1]);
        });
        res.status(200).json(prodsArray);
    } catch (err) {
        handleError(res, err.message, "Failed to get list.");
    }
};

exports.postItem = async (req, res, next) => {
    if (!validProduct(req, res)) {
        return;
    }
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    });
    try {
        await product.save();
        console.log(`[:: Create succeed] ProductId: ${product._id}`);
        res.status(201).json(product);
    } catch (err) {
        handleError(res, err.message, "Failed to create new product.");
    }
};

exports.getItem = async (req, res, next) => {
    const prodId = req.params.prodId;
    try {
        const product = await Product.findById(prodId);
        res.status(200).json(product);
    } catch (err) {
        handleError(res, err.message, `Failed to get product ID: ${req.params.prodId}`);
    }
};

exports.putUpdateItem = async (req, res, next) => {
    const prodId = req.params.prodId;
    const body = req.body;
    try {
        const product = await Product.findById(prodId);
        if (!validProduct(req, res)) {
            return;
        }
        product.title = body.title;
        product.price = body.price;
        product.description = body.description;
        product.imageUrl = body.imageUrl;
        await product.save();
        console.log(`[:: Update succeed] ProductId: ${product._id}`);
        res.status(200).json(product);
    } catch (err) {
        handleError(res, err.message, `Failed to update product ID: ${req.params.prodId}`);
    }
};

exports.deleteItem = async (req, res, next) => {
    const prodId = req.params.prodId;
    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return handleError(res, "Item not found", "Item not found, failed to delete product", 404);
        }
        await product.deleteOne({ _id: prodId });
        console.log(`[:: Delete succeed] ProductId: ${prodId}`);
        res.status(200).json(prodId);
    } catch (err) {
        handleError(res, err.message, "Failed to delete product");
    }
};