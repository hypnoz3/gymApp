require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json());

const excerciseRouter = require('./routes/excercises')
app.use('/excercises', excerciseRouter)

const port = process.env.PORT || 3500;


app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});