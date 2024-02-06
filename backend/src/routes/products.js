const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage}).single('file');

router.post('/image', auth, async(req, res, next) => {
    //이미지 업로드
    upload(req, res, err => {
        if(err) {
            return res.status(500).send(err);
        }

        return res.json({fileName: res.req.file.filename});
    })
});

router.post('/', auth, async(req, res, next) => {
    //상품등록
    try {
        const product = new Product(req.body);
        await product.save();
        return res.sendStatus(200);

    } catch (error) {
        next(error);
    }
});

module.exports = router