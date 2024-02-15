const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/register', async(req, res, next) => {
    //회원가입
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);

    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    //로그인
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(400).send("존재하지 않는 계정입니다.");
        }

        const isMatch = await user.comparePassword(req.body.password);
        if(!isMatch) {
            return res.status(400).send("비밀번호를 확인해주세요.");
        }

        const payload = { userId: user._id.toHexString() };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.json({user, accessToken});

    } catch (error) {
        next(error);
    }
});

router.get('/auth', auth, async(req, res, next) => {
    //인증
    return res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post('/logout', auth, async(req, res, next) => {
    //로그아웃
    try {
        return res.sendStatus(200);

    } catch (error) {
        next(error);
    }
});

router.post('/cart', auth, async(req, res, next) => {
    //장바구니 담기
    try {
        const userInfo = await User.findOne({_id: req.user._id});

        //이미 장바구니에 있는 상품인지 체크
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId) {
                duplicate = true;
            }
        });

        if(duplicate) {
            const user = await User.findOneAndUpdate(
                {_id: req.user._id, "cart.id": req.body.productId},  //업데이트 할 데이터
                {$inc: {"cart.$.quantity": 1}},  //업데이트 내용
                {new: true}  //업데이트 된 데이터 return
            );

            return res.status(201).send(user.cart);
        }
        else {
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {$push: {
                    cart: {
                        id: req.body.productId,
                        quantity: 1,
                        date: Date.now()
                    }
                }},
                {new: true}
            );

            return res.status(201).send(user.cart);
        }

    } catch (error) {
        next(error);
    }
});

module.exports = router