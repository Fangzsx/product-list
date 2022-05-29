const express = require('express');
const app = express();
const productRouter = require('./routers/productsRouter');
const userRouter = require('./routers/usersRouter');

app.use(express.json());

//custom middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter);

module.exports = app;