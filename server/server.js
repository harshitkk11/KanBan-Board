require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user')
const boardRoutes = require('./routes/board')


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/', userRoutes)
app.use('/', boardRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to database and Server is running on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })