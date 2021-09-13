const express = require('express');
const app = express();
const setupDB = require('./db/db');
const knex = require('knex');
const config = require('./db/knexfile.js')
const cors = require('cors')
const DataDAO = require('./dao/dataDAO')
const fileUpload = require('express-fileupload')
const path = require('path')

app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
setupDB()
app.use(cors())
app.use(fileUpload())

app.listen(5001, () => {
    console.log('Server is running on port 5001')
})

app.get('/api/v1/data/', (req, res, next) => {
    DataDAO.getAllData(function (err, result) {
        if (err) {
            res.send(err)
        }
        res.send({ err: false, data: result })
    })
})
app.post('/api/v1/data/', async (req, res, next) => {
    let imageFile, uploadPath, timeStamp = Date.now();
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imageFile = req.files.image;
    uploadPath = '/upload/' + timeStamp + '_' + imageFile.name
    let FuploadPath = __dirname + uploadPath;
    const payload = req.body;
    imageFile.mv(FuploadPath, function (err, result) {
        if (err) {
            res.send(err)
        }
        DataDAO.create({ ...payload, image: uploadPath }, function (err, result) {
            if (err) {
                res.send(err)
            }
            res.send({ err: false, data: result })
        })
    })
});
app.put('/api/v1/data/:id', async (req, res, next) => {
    const id = req.params.id, payload = req.body;
    if (req.files) {
        let imageFile, uploadPath, timeStamp = Date.now();
        imageFile = req.files.image;
        uploadPath = '/upload/' + timeStamp + '_' + imageFile.name
        let FuploadPath = __dirname + uploadPath;
        imageFile.mv(FuploadPath, function (err, result) {
            if (err) {
                res.send(err)
            }
            DataDAO.updateById(id, { ...payload, image: uploadPath }, function (err, result) {
                if (err) {
                    res.send(err)
                }
                res.send({ err: false, data: result })
            })
        })
    } else {
        DataDAO.updateById(id, payload, function (err, result) {
            if (err) {
                res.send(err)
            }
            res.send({ err: false, data: result })
        })
    }

});
app.delete('/api/v1/data/:id', async (req, res, next) => {
    const id = req.params.id
    DataDAO.deleteById(id, function (err, result) {
        if (err) {
            res.send(err)
        }
        res.send({ err: false, data: result })
    })
});