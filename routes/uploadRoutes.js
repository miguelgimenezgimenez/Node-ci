const AWS = require('aws-sdk')
const keys = require('../config/keys')
const { accessKeyId, secretAccessKey } = keys
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')
const s3 =  new AWS.S3({secretAccessKey, accessKeyId})

module.exports = app =>{
    app.get('/api/upload', requireLogin, (req,res)=>{
        const key = `${req.user.id}/${uuid()}.jpeg`
        s3.getSignedUrl('putObject', {
            Bucket: 'node-ci-miguel-project',
            ContentType: 'image/jpeg', 
            Key: key
        }, (err, url)=>{
            res.send({key, url})})
    })
}