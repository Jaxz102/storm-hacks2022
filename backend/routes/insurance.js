const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const cors = require("cors")
const axios = require('axios')
const fileUpload = require("express-fileupload")
const path = require('path');

const admin = require("firebase-admin");
const db = admin.firestore()

router.use(fileUpload())
router.use(cors())

const parseDate = (date) => {
  const prettyDate = date.split(" ").slice(1, 4).join(" ")
  const prettyTime = date.split(" ")[4].slice(0, -3)
  return {prettyTime: prettyTime, prettyDate: prettyDate}
}

router.get("/", (req, res) => {
  var options = {
    root: "C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/insuranceUploads/"
  };
  var fileName = 'paramedical-sample-receipt.jpg';

  res.sendFile("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/insuranceUploads/paramedical-sample-receipt.jpg");
})


router.post("uploadInsurance", (res, req) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const insuranceFile = req.files.insuranceFile
  const uploadPath = process.env.INSURANCE_FILE_PATH + insuranceFile.name
  insuranceFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send('File uploaded!')
  })

//   var options = {
//     root: path.join(__dirname)
//   };
 
// var fileName = 'GeeksforGeeks.txt';

})









const { createWorker, createScheduler } = require('tesseract.js')
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











module.exports = router