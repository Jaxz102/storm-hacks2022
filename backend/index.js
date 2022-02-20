require('dotenv').config()
const express = require("express")
const cors = require("cors")
const {v4} = require("uuid")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload())
app.use(express.static('public'))
app.use('/static', express.static('/Users/jaxz/Desktop/storm-hacks2022/backend/public'))

const admin = require('firebase-admin')
const serviceAccount = require('./firebaseAPI');
const { getStorage } = require("firebase/storage")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://stormhacks-76638.appspot.com/"
});
const db = admin.firestore(); 
const storage = getStorage();



// ////////////////////////////////////////
app.use("/account", require("./routes/account"))
app.use("/insurance", require("./routes/insurance"))
app.use("/learn", require("./routes/learn"))
app.use("/studenthub", require("./routes/studenthub"))


app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/upload.html")
})











app.listen(3000, () => {console.log("Running backend on port 3000")})