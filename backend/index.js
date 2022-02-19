const express = require("express")
const cors = require("cors")
const {v4} = require("uuid")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {return res.send("Backend Live")})















app.listen(3000, () => {console.log("Running backend on port 3000")})