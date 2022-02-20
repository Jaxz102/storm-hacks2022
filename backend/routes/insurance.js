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


// router.post('/insuranceUpload', async (req, res) => {
//   console.log("INSURANCE UPLOAD POSTED")
//   // Check for upload
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   // Upload
//   var insuranceFile = req.files.myFile;
//   uploadPath = process.env.INSURANCE_FILE_PATH + insuranceFile.name;
//   var insuranceFileId = insuranceFile.mv(uploadPath, (err) => {
//     if (err) {return res.status(500).send(err);}
//   })
//   // Rename file
//   insuranceFileId = v4()
//   const fileExtension = path.extname(uploadPath)
//   const renameFilePath = process.env.INSURANCE_FILE_PATH + insuranceFileId + fileExtension
//   setTimeout(()=>fs.renameSync(uploadPath, renameFilePath), 1000)
//   console.log("ok")

//   var relativePath = renameFilePath.split("/").slice(-2).join("/")

//   setTimeout(()=>{return res.json({imagePath: relativePath})}, 500)
//   // return res.json({imagePath: renameFilePath})
// })





const { createWorker, createScheduler } = require('tesseract.js')
const worker = createWorker();

const OCR = async (rectangles, rectangleLabels, filePath) => {
    console.log("Running OCR")
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const data = [];
    for (let i = 0; i < rectangles.length; i++) {
      const { data: { text } } = await worker.recognize('C:/Users/Ryan Lam/Desktop/storm-hacks2022/backend/public/uploads/Sample-Doctors-Recipt-Template.jpg', { rectangle: rectangles[i] });
      console.log(text)
      data.push({type: rectangleLabels[i], text: text});
    }
    console.log(data);
    await worker.terminate();

    console.log("Done")
    return data
}

router.post("/getOCR", async (req, res) => {
  const {rectangles, fileId} = req.body
  var rectangleQuery = []
  var rectangleQueryLabels = []

  rectangles.forEach((rectangle)=>{
    rectangleQueryLabels.push(rectangle.type)
    rectangleQuery.push({
      left:rectangle.startX,
      top:rectangle.startY,
      width:rectangle.endX-rectangle.startX,
      height:rectangle.endY-rectangle.startY
    })
  })

  const filePath;

  const data = await OCR(rectangleQuery, rectangleQueryLabels, filePath)
  return res.json({data: data})
})



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
// func()
// console.log(data)




const createClaim = async (company, companyAddress, companyInfo, date, amount, fileId) => {

  // await insuranceDB.set
}






module.exports = router