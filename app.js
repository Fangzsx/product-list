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

//Server start
const port = 3000;
app.listen(3000, () => {
    console.log(`app started with port ${port}`);
});