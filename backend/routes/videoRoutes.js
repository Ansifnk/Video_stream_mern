let express = require('express');
const Video = require('../modals/VideoModal');

let router = express.Router();

router.post('/create', async (req, res) => {

    let newVid = {
        name: 'new Video',
        thumbnail: 'https://cdn.pixabay.com/photo/2013/04/11/19/46/building-102840_960_720.jpg'
    };


    try {
        let user = await Video.create(newVid)
        // console.log(user)
        // console.log(token)
        res.status(200)
            .send(user)
    } catch (error) {
        console.log(error)
    }

})

router.get('/get_all', async (req, res) => {


    try {
        let videos = await Video.find()
        // console.log(user)
        // console.log(token)
        res.status(200)
            .send(videos)
    } catch (error) {
        console.log(error)
    }

})


module.exports = router