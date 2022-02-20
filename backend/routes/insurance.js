const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const cors = require("cors")
const axios = require('axios')
const fileUpload = require("express-fileupload")
const path = require('path');
const fs = require('fs')

const admin = require("firebase-admin");
const db = admin.firestore()
const insuranceDB = db.collection("insurance")

const parseDate = (date) => {
  const prettyDate = date.split(" ").slice(1, 4).join(" ")
  const prettyTime = date.split(" ")[4].slice(0, -3)
  return {prettyTime: prettyTime, prettyDate: prettyDate}
}

// router.get("/", (req, res) => {
//   var options = {
//     root: "C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/insuranceUploads/"
//   };
//   var fileName = 'paramedical-sample-receipt.jpg';

//   res.sendFile("C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/insuranceUploads/paramedical-sample-receipt.jpg");
// })


router.post('/insuranceUpload', async (req, res) => {
  console.log("INSURANCE UPLOAD POSTED")
  // Check for upload
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // Upload
  var insuranceFile = req.files.insuranceFile;
  uploadPath = process.env.INSURANCE_FILE_PATH + insuranceFile.name;
  var insuranceFileId = await insuranceFile.mv(uploadPath, (err) => {
    if (err) {return res.status(500).send(err);}
  })
  // Rename file
  insuranceFileId = v4()
  const fileExtension = path.extname(uploadPath)
  const renameFilePath = process.env.INSURANCE_FILE_PATH + insuranceFileId + fileExtension
  fs.renameSync(uploadPath, renameFilePath)


  setTimeout(()=>res.sendFile(renameFilePath), 2000)
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




const createClaim = async (company, companyAddress, companyInfo, date, amount, fileId) => {

  // await insuranceDB.set
}






module.exports = router