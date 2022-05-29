const express = require("express");
const fs = require("fs");
const router = express.Router();

const products = JSON.parse(
    String(fs.readFileSync(`${__dirname}/../dev-data/data/product-list.json`))
);

const updateProduct = (req, res) => {
    const id = req.params.id * 1

    const product = products.find((product) => product.id === id)

    if(!product){
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid id'
        });
    }
    res.status(200).send({
        status : 'success',
        data : {
            product : '<Updated product here>'
        }
    });

};
const getAllProducts = (req, res) => {
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        results : products.length,
        data : {
            products : products
        }
    })
};
const getProduct = (req, res) => {
    const id = req.params.id * 1;
    const product = products.find(product => product.id === id)

    if(!product){
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid id'
        });
    }

    res.status(200).json({
        status : 'success',
        data : {
            product
        }
    });
};
const deleteProduct = (req, res) => {
    const id = req.params.id * 1;
    const product = products.find((product) => product.id === id)
    if(!product){
        res.status(404).json({
            status : 'fail',
            message : 'Invalid id'
        });
    }

    res.status(204).json({
        status : 'success',
        data : null
    });
};
const createProduct = (req, res) => {
    const id = products[products.length-1].id + 1;
    const newProduct = Object.assign({id : id}, req.body);
    products.push(newProduct);

    fs.writeFile(`${__dirname}/dev-data/data/product-list.json`, JSON.stringify(products), err => {
        res.status(201).json({
            status : 'success',
            data: {
                product : newProduct
            }
        });
    });
};

router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProduct)
    .get(getProduct)

module.exports = router;