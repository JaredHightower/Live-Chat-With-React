const functions = require('firebase-functions');
const config = functions.config()

module.exports = functions.https.onRequest((request, response) => {
    functions.logger.info("clever bot logs", { structuredData: true });
    response.send(config.cleverbot.key);
});