const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()
const accountDB = db.collection("account")
const user = db.collection("user")

const getEvents = async () => {
    var events = []
    const eventQueryset = await accountDB.orderBy("date", "desc").limit(5).get()
    eventQueryset.forEach((event) => events.push(event.data()))
    console.log(events)
    var accountBalance = await (await user.doc("user").get()).data().accountBalance
    console.log(accountBalance)
    return {
        accountBalance: accountBalance,
        data: events
    }
}

router.get("/", async (req, res) => {
    console.log("GET account events")
    const events = await getEvents()
    return res.send(events)
})

router.post("/", async (req, res, next) => {
    console.log("POST account event")
    const {transactionName, transactionType, amount} = req.body
    const transactionId = v4()
    const date = Date.now()
    const prettyDate = Date(date)
    console.log("Sync with account Balance")
    var accountBalance = await (await user.doc("user").get()).data().accountBalance
    if (transactionType === "debit") {
        accountBalance += amount
    } else {
        accountBalance -= amount
    }
    await user.doc("user").set({
        accountBalance:accountBalance
    })
    console.log("Add account event")
    await accountDB.doc(transactionId).set({
        transactionName:transactionName, 
        transactionType:transactionType, 
        amount:amount,
        id:transactionId,
        date:date,
        prettyDate:prettyDate,
        accountBalance: accountBalance
    })
    console.log("GET account events")
    const events = await getEvents()
    return res.send(events)
})








const deleteEvents = async () => {
    console.log("Deleting account events")
    await accountDB.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
}
const showEvents = async () => {
    console.log("Getting account events")
    var events = []
    const eventQueryset = await accountDB.orderBy("date", "desc").limit(5).get()
    eventQueryset.forEach((event) => events.push(event.data()))
    console.log(events)
}
// deleteEvents()
// showEvents()


module.exports = router