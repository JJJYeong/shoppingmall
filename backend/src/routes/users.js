const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async(req, res) => {
    //회원가입
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);

    } catch (error) {
        next(error);
    }
});

module.exports = router