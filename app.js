const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const products = JSON.parse(
    String(fs.readFileSync(`${__dirname}/dev-data/data/product-list.json`))
);

//show all products
app.get('/api/v1/products', (req, res) => {
    res.status(200).json({
        status : 'success',
        results : products.length,
        data : {
            products : products
        }
    })

})

app.get('/api/v1/products/:id', (req, res) => {
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

});

app.patch('/api/v1/products/:id', (req, res) => {
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
    })

})

app.post('/api/v1/products', (req, res) => {
    const id = products[products.length-1].id + 1;
    const newProduct = Object.assign({id : id}, req.body);
    products.push(newProduct);

    fs.writeFile(`${__dirname}/dev-data/data/product-list.json`, JSON.stringify(products), err => {
        res.status(201).json({
            status : 'success',
            data: {
                product : newProduct
            }
        })
    })
})

const port = 3000;
app.listen(3000, () => {
    console.log(`app started with port ${port}`);
});