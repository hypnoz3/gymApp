const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

    router
        .route('/auth/register')
        .post(auth.register);

    router
        .post("/auth/login", auth.login);

    router
        .post("/auth/refreshtoken", auth.refreshTokenCall);


    router
        .post("/api/refreshuser", auth.refreshUser);
           

module.exports = router;