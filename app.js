const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const products = JSON.parse(
    String(fs.readFileSync(`${__dirname}/dev-data/data/product-list.json`))
);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

//route handlers
//1. Products
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

//2. Users
const createUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined.'
    })
};
const getAllUsers = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'Users not yet defined.'
    })
};
const getUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        message : 'User not yet defined.'
    });
};
const updateUser = (req, res) => {
  res.status(500).json({
      status : 'error',
      message : 'Users not yet defined'
  })
};
const deleteUser = (req, res) => {
  res.status(500).json({
      status : 'error',
      message : 'Users not yet defined.'
  })
};

//routers
const productRouter = express.Router();
app.use('/api/v1/products', productRouter)

productRouter.route('/')
    .get(getAllProducts)
    .post(createProduct);

productRouter.route('/:id')
    .patch(updateProduct)
    .delete(deleteProduct)
    .get(getProduct)

app.route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)


const port = 3000;
app.listen(3000, () => {
    console.log(`app started with port ${port}`);
});