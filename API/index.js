require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const userRoutes = require('./routes/userRoutes');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(

    "Access-Control-Allow-Methods",

    "GET, POST, PUT, PATCH, DELETE"

  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();

});

// app.use(router);

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());



// app.use(function(req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         next();
//       });
//     } else {
//       req.user = undefined;
//       next();
//     }
//   });
 

app.use('/', userRoutes);


app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });

const excerciseRouter = require('./routes/excercises')

app.use('/excercises', excerciseRouter)

const port = process.env.PORT || 3500;


app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});