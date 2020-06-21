const path = require('path');
const fs = require('fs');
var multer  = require('multer');
const {mkdirsSync} = require('../utils/dir');
var express = require('express');
var router = express.Router();
const uploadPath = path.join(__dirname, '../uploads');
const uploadTempPath = path.join(uploadPath, 'temp/')
var upload = multer({dest: uploadTempPath});
router.get('/', function(req, res) {
    res.json({a: 1});
});

router.post('/algorithm', function(req, res, next) {
    res.send('...');
});

router.post('/upload', upload.single('file'), function(req, res, next) {
    const {
        name,
        size,
        total,
        hash,
        index,
        file
    } = req.body;
    console.log(res.file);
    const chunksPath = path.join(uploadPath, hash, '/');
    if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
    fs.renameSync(req.file.path, chunksPath + hash + '-' + index);        
    res.json({message: 'SUCCEED'});
});

router.post('/merge_chunks', function(req, res, next) {
    const {
        size,
        name,
        hash,
        total
    } = req.body;
    const chunksPath = path.join(uploadPath, hash, '/');
    const chunks = fs.readdirSync(chunksPath);
    const filePath = path.join(uploadPath, name);
    fs.writeFileSync(filePath, '');
 
    if (chunks.length !== total || chunks.length === 0) {
        res.status = 200;
        res.end('切片数量不符合');
    }
    for(let i = 0; i < total; i++) {
        fs.appendFileSync(filePath, fs.readFileSync(chunksPath + hash + '-' + i));
        // fs.unlinkSync(chunksPath + hash + '-' + i);
    }
    // fs.rmdirSync(chunksPath);
    res.json({message: 'SUCCEED'});
})

module.exports = router;