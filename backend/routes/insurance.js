const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()


// const uploadImage = async (imagePath) => {

// }
const { createWorker } = require("tesseract.js")

const func = async () => {
    console.log("Running OCR")
    const worker = createWorker();
    console.log("Worker Created")
    await worker.load();
    console.log("Worker Loaded")
    await worker.loadLanguage('eng')
    await worker.initialize('eng');
    console.log("Set language and init");
    const { data: { text, confidence } } = await worker.recognize("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg");
    return [text, confidence]
    // const data = await worker.recognize("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg");
    // console.log(data);
    // return data
  }
// func()


router.get("/", async (req, res) => {
    const data = await func()
    console.log("Done!")
    return res.send(data)
})




module.exports = router