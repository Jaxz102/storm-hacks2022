const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
const axios = require('axios')

const admin = require("firebase-admin");
const db = admin.firestore()
const studenthubDB = db.collection("studenthub")

const parseDate = (date) => {
    const prettyDate = date.split(" ").slice(1, 4).join(" ")
    const prettyTime = date.split(" ")[4].slice(0, -3)
    return {prettyTime: prettyTime, prettyDate: prettyDate}
}


router.get("/", async (req, res) => {
    var studentDeals = []
    const deals = await studenthubDB.get()
    deals.forEach((deal) => {
        studentDeals.push(deal.data())
    })
    return res.send(studentDeals)
})

router.delete("/", async (req, res) => {
    console.log("Deleting student deal")
    const {dealId} = req.body
    await studenthubDB.doc(dealId).delete()
    return res.json({success: true})
})







const addDeal = async (deals) => {
    await deals.forEach(async (deal) => {
        console.log("Adding student deal")
        const id = v4()
        const expiry = parseDate((new Date(new Date('December 31, 2022 23:59:59'))).toString())
        await studenthubDB.doc(id).set({
            id:id,
            company: deal.company,
            title:deal.title,
            code:deal.code,
            toc:deal.toc,
            prettyDate: expiry.prettyDate,
            prettyTime: expiry.prettyTime
        })
    })
}
const deleteDeals = async () => {
    console.log("Deleting deals from DB")
    await studenthubDB.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
}
// addDeal([
//     {
//         company: "Samsung",
//         title:"Save up to 10% on select Samsung products*",
//         code: "STUDENT10",
//         toc: "*Terms and conditions apply. Save up to 10% (before taxes) on the purchase price of select Samsung Monitors, Smartphones, Laptops, Chromebooks, Tablets, Wearables and Accessories when you purchase online at https://shop.samsung.com/ca/multistore/caepp/sppsso1/ now until December 31, 2022. Outright purchases only. While quantities last. Availability and selection may vary. No rain cheques. Offer has no cash value. Open to SPC members only. Open to Canadian Residents only. Cannot be combined with any other offer or promotion, unless specifically agreed to by Samsung. Usage may be restricted when used with any other offer, clearance, in-store or online promotion including but not limited to Black Friday, Cyber Monday and Boxing Week offers. Offer may be cancelled or changed without notice. ©2020 Samsung Electronics Canada Inc. All rights reserved. Samsung and Samsung Galaxy are registered trademarks of Samsung Electronics Co., Ltd., used with permission. *0% financing for up to 36 months applies to eligible customers who meet the minimum amount applicable for PayBright financing of $300 (before taxes and fees), on approved credit. You may not be eligible for 0% interest plan and you monthly payment amount, the interest you will pay, and the loan terms available depend on your personal credit profile. Monthly payments may include a monthly Processing Fee of $6.95. Eligible Samsung Products are: Smartphone devices, laptops, cases, tablets, wearables, chargers, AKG audio, and SmartThings products in all models and colours. Financing provided by PayBright or its partner, Easy Financial. All transactions are subject to approval by PayBright or its partner, Easy Financial. Financing offers may vary from time to time. Financing offers may vary for customers in the Province of Quebec. See www.paybright.com/faq for more information. Example: a Galaxy S20 Ultra 5G (SM-G988WZKAXAC) with a selling price (MSRP) of $1849.99 financed at 0% APR for 36 months, which equals 36 monthly payments of $51.39. Cost of borrowing is $0 for a total obligation of $1849.99. Taxes, shipping and other fees [if applicable] are extra. Offer ends December 31, 2022 and is subject to change/cancellation without notice.",
//     },
//     {
//         company: "Apple",
//         title:"New subscribers get 6 months Apple Music free with your eligible AirPods, HomePod mini or Beats*",
//         code: "MUSIC6",
//         toc: "*Offer is available for new subscribers with an eligible device for a limited time only. Plan automatically renews at $9.99 per month until cancelled. No purchase necessary for current owners of eligible devices. Service availability varies by region. Restrictions and other terms apply.",
//     },
//     {
//         company: "Amazon",
//         title:"Get $20 in Amazon credits when you buy a gift card*",
//         code:"GIFTCARD21",
//         toc: '*In order to qualify for the promotional credit, you must: (1) be the recipient of the corresponding offer (either via email or on Amazon.com) and be a first-time gift card purchaser; (2) purchase at least $50 in Amazon Gift Cards ("GCs") in a single order at Amazon.com between December 26, 2021, and December 31, 2022, 11:59 PM (PT); and (3) enter the promotional code "USGIFTCARD21" in the "Gift Cards & Promotional Codes" box when you check out, or click the button to add the coupon to your account.',
//     }
// ])
// deleteDeals()

module.exports = router