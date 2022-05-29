const fs = require("fs");
const products = JSON.parse(
    String(fs.readFileSync(`${__dirname}/../dev-data/data/product-list.json`))
);


exports.checkID = (req, res, next, val) => {
    console.log(val);
    const id = req.params.id * 1
    const product = products.find((product) => product.id === id)

    if(!product){
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid id'
        });
    }
    next();

}

exports.updateProduct = (req, res) => {
    res.status(200).send({
        status : 'success',
        data : {
            product : '<Updated product here>'
        }
    });

};
exports.getAllProducts = (req, res) => {
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        results : products.length,
        data : {
            products : products
        }
    })
};
exports.getProduct = (req, res) => {
    const id = req.params.id * 1;
    const product = products.find(product => product.id === id)

    res.status(200).json({
        status : 'success',
        data : {
            product
        }
    });
};
exports.deleteProduct = (req, res) => {
    res.status(204).json({
        status : 'success',
        data : null
    });
};
exports.createProduct = (req, res) => {
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