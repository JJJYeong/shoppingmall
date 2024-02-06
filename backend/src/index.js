const express = require('express')
const path = require('path')
const app = express()
const port = 4000
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected...');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res, next) => {
    res.send('Hello, World!');
    // setImmediate(() => {
    //     next(new Error('it is an error'));
    // });
});

app.post('/', (req, res) => {
    res.json(req.body);
});

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'server error!');
});

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});