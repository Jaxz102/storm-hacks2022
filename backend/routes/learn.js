const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()
const learnDB = db.collection("learn")

const parseDate = (date) => {
    const prettyDate = date.split(" ").slice(1, 4).join(" ")
    const prettyTime = date.split(" ")[4].slice(0, -3)
    return {prettyTime: prettyTime, prettyDate: prettyDate}
}



// Get list of videos
router.get("/", async (req, res) => {
    var videos = []
    const videoList = await learnDB.limit(5).get()
    videoList.forEach((video) => {
        videos.push(video.data())
    })
    return res.json({data: videos})
})

// Suggest a video
router.post("/", async (req, res) => {
    const {link} = req.body
    const video = await axios.get(`https://www.youtube.com/oembed?url=${link}&format=json`)
    console.log(video.data)
    return res.send(video.data)
})




// Add videos into DB
const addVideos = async (videoLinks) => {
    console.log("Adding videos to DB")
    for (link of videoLinks) {
        const id = v4()
        const video = await axios.get(`https://www.youtube.com/oembed?url=${link}&format=json`)
        const videoLink = video.data.html.split(" ")[3].split('"')[1]
        await learnDB.doc(id).set(video.data)
        await learnDB.doc(id).set({
            videoLink: videoLink
        }, {merge: true})
    }
}
const deleteVideos = async () => {
    console.log("Deleting videos from DB")
    await learnDB.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
}
// addVideos([
//     "https://www.youtube.com/watch?v=JEqQHmVE-_g&list=PLRz9ao70iRy1L-MCczfyZDMHQZcduFCvw&index=1",
//     "https://www.youtube.com/watch?v=R-fLM70b1ok&list=PLRz9ao70iRy1L-MCczfyZDMHQZcduFCvw&index=2",
//     "https://www.youtube.com/watch?v=z-DgiaMwQU0&list=PLRz9ao70iRy1L-MCczfyZDMHQZcduFCvw&index=3",
//     "https://www.youtube.com/watch?v=tEmLcs6e-cY&list=PLRz9ao70iRy1L-MCczfyZDMHQZcduFCvw&index=5",
//     "https://www.youtube.com/watch?v=N2BHZjO5a7Q&list=PLRz9ao70iRy1L-MCczfyZDMHQZcduFCvw&index=7"
// ])
// deleteVideos()



module.exports = router