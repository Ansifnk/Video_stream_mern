let express = require('express');
const Video = require('../modals/VideoModal');

let router = express.Router();

router.post('/create', async (req, res) => {

    let newVid = {
        name: 'new Video',
        thumbnail: 'https://cdn.pixabay.com/photo/2013/04/11/19/46/building-102840_960_720.jpg',
        video_url: 'https://www.youtube.com/watch?v=qALsVa-V9qo'
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

router.get('/:_id', async (req, res) => {
    const { _id } = req.params ?? {}

    if (!_id) return res.sendStatus(401)

    try {
        let video = await Video.findById(_id)
        // console.log(user)
        // console.log(token)
        if (!video) return res.sendStatus(401)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})

router.post('/like', async (req, res) => {
    const { _id } = req.body ?? {}

    if (!_id) return res.sendStatus(401)

    try {
        let video = await Video.findByIdAndUpdate(_id, { $inc: { likes: 1 } }, { new: true })
        // console.log(user)
        // console.log(token)
        if (!video) return res.sendStatus(401)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})

router.post('/views', async (req, res) => {
    const { _id } = req.body ?? {}

    if (!_id) return res.sendStatus(401)

    try {
        let video = await Video.findByIdAndUpdate(_id, { $inc: { views: 1 } }, { new: true })
        // console.log(user)
        // console.log(token)
        // if (!video) return res.sendStatus(401)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})


router.post('/comment', async (req, res) => {
    const { _id, comment } = req.body ?? {}
    if (!_id) return res.sendStatus(401)

    const newComment = {
        user_name: 'user_1',
        comment
    }

    try {
        let video = await Video.findByIdAndUpdate(_id, { $push: { comments: newComment } }, { new: true })

        res.status(200)
            .send(video.comments)
    } catch (error) {
        console.log(error)
    }

})

router.get('/comments/:id', async (req, res) => {
    const { id, comment } = req.params ?? {}
    if (!id) return res.sendStatus(401)

    try {
        let video = await Video.findById(id)

        res.status(200)
            .send(video.comments)
    } catch (error) {
        console.log(error)
    }   

})


module.exports = router