require("isomorphic-fetch")
const functions = require("firebase-functions")
const admin = require("firebase-admin")

const config = functions.config()
const db = admin.firestore()

const bot = {
    displayName: "cleverbot",
    photoUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712009.png",
    uid: "cleverbot",
    status: {
        lastChanged: new Date(),
        state: "online"
    },
    channels: {
        general: true
    }
}
db.collection("users")
    .doc(bot.uid)
    .set(bot, { merge: true })

const KEY = config.cleverbot.key
let cs = ""

const sendMessageToBot = async (message) => {
    const url = `https://www.cleverbot.com/getreply?key=${KEY}&input=${encodeURIComponent(message)}&cs=${cs}`
    return fetch(url)
        .then(res => { return res.json() })
        .then(json => {
            cs = json.cs
            return json.output
        })
}

const sleep = () => {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 3000)
    })
}

module.exports = functions.firestore
    .document("channels/general/messages/{messageId}")
    .onCreate(async (doc, context) => {
        const message = doc.data()
        if (!message.text.startsWith("@cleverbot")) return;

        return sleep().then(async () => {
            await sendMessageToBot(message.text.replace(/^@cleverbot/, "")).then(botResponse => {
                return db.collection("channels/general/messages").add({
                    text: botResponse,
                    user: db.collection("users").doc("cleverbot"),
                    createdAt: new Date()
                })
            })

        })
    })