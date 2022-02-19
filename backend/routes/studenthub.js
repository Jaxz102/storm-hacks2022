const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()
const studenthubDB = db.collection("studenthub")


router.get("/", async (req, res) => {
    var studentDeals = []
    const deals = await studenthubDB.get()
    deals.forEach((deal) => {
        studentDeals.push(deal.data())
    })
    return res.send(studentDeals)
})




const addDeal = async (deal) => {
    console.log("Adding student deal")
    const id = v4()
    await studenthubDB.doc(id).set({
        data: deal
    })
}
const deleteDeal = async () => {
    console.log("Deleting deals from DB")
    await studenthubDB.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
}
// addDeal("1234543feahkdwea21")
// deleteDeal()



module.exports = router