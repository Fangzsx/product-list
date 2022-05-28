const fs = require('fs');
const express = require('express');
const app = express();

const products = JSON.parse(
    String(fs.readFileSync(`${__dirname}/dev-data/data/product-list.json`))
);

//show all products
app.get('/api/v1/products', (req, res) => {
    res.status(200).json({
        status : 'success',
        data : {
            products : products
        }
    })

})

const port = 3000;
app.listen(3000, () => {
    console.log(`app started with port ${port}`);
});