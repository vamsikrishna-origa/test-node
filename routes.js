var express = require('express');
var api = require('./controller');
var multer = require("multer");
var upload = multer({ dest: 'uploads/' });

var router = express.Router();

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '-' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage }).single("image");

router.post('/uploads', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.json({});
        }
        console.log(req.file);
        res.json(req.file);
    })
})
router.post('/create', api.create);
router.get('/fetch/:id', api.fetch);
router.put('/update/:id', api.update);
router.delete('/delete/:id', api.delete);

module.exports = router;
