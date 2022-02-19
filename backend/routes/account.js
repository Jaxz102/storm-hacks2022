const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()
const accountDB = db.collection("account")

const getEvents = async () => {
    var events = []
    const eventQueryset = await accountDB.orderBy("date", "desc").limit(5).get()
    eventQueryset.forEach((event) => events.push(event.data()))
    console.log(events)
    return events
}

router.get("/", async (req, res) => {
    console.log("GET account events")
    const events = await getEvents()
    return res.json({data: events})
})

router.post("/", async (req, res, next) => {
    console.log("POST account event")
    const {transactionName, transactionType, amount} = req.body
    const transactionId = v4()
    const date = Date.now()
    const prettyDate = Date(date)
    await accountDB.doc(transactionId).set({
        transactionName:transactionName, 
        transactionType:transactionType, 
        amount:amount,
        id:transactionId,
        date:date,
        prettyDate:prettyDate
    })
    console.log("GET account events")
    const events = await getEvents()
    return res.json({data: events})
})





const deleteEvents = async () => {
    console.log("Deleting account events")
    await accountDB.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
}
// deleteEvents()



const showEvents = async () => {
    console.log("Getting account events")
    var events = []
    const eventQueryset = await accountDB.orderBy("date", "desc").limit(5).get()
    eventQueryset.forEach((event) => events.push(event.data()))
    console.log(events)
}
// showEvents()


module.exports = router