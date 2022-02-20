const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()

const parseDate = (date) => {
  const prettyDate = date.split(" ").slice(1, 4).join(" ")
  const prettyTime = date.split(" ")[4].slice(0, -3)
  return {prettyTime: prettyTime, prettyDate: prettyDate}
}


// const uploadImage = async (imagePath) => {

// }
const { createWorker, createScheduler } = require('tesseract.js')

// const func = async () => {
//     console.log("Running OCR")
//     const worker = createWorker();
//     console.log("Worker Created")
//     await worker.load();
//     console.log("Worker Loaded")
//     await worker.loadLanguage('eng')
//     await worker.initialize('eng');
//     console.log("Set language and init");
//     const { data: { text, confidence } } = await worker.recognize("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg");
//     return [text, confidence]
//     // const data = await worker.recognize("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg");
//     // console.log(data);
//     // return data
//   }
const worker = createWorker();
const rectangles = [
  {
    left: 0,
    top: 0,
    width: 750,
    height: 250,
  },
  {
    left: 500,
    top: 0,
    width: 500,
    height: 250,
  },
];
const func = async () => {
    console.log("Running OCR")
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const values = [];
    for (let i = 0; i < rectangles.length; i++) {
      const { data: { text } } = await worker.recognize('C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg', { rectangle: rectangles[i] });
      console.log(text)
      values.push(text);
    }
    console.log(values);
    await worker.terminate();
    console.log("Done")
}
// func()
// console.log(data)



// router.get("/", async (req, res) => {
//     const data = await func()
//     console.log("Done!")
//     return res.send(data)
// })


module.exports = router