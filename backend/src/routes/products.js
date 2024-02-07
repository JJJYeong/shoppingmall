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

router.get('/', async(req, res, next) => {
    //상품목록 가져오기
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};
    for(let key in req.query.filters) {
        if(req.query.filters[key].length > 0) {
            if(key === 'price') {
                //가격 radiobox
                findArgs[key] = {
                    $gte: req.query.filters[key][0],  //Greater then equal
                    $lte: req.query.filters[key][1]   //Less then equal
                }
            } else {
                //지역 checkbox
                findArgs[key] = req.query.filters[key];
            }
        }
    }

    if(term) {
        //검색어 text
        findArgs["$text"] = {$search: term};
    }

    try {
        const products = await Product.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit);
        const productTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productTotal ? true : false;

        return res.status(200).json({products, hasMore});

    } catch (error) {
        next(error);
    }
});

module.exports = router