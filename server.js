//Server start
const app = require('./app');

const port = 3000;
app.listen(3000, () => {
    console.log(`app started with port ${port}`);
});