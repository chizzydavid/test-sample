require('dotenv').config()
const { App } = require('@slack/bolt')
const { registerListeners } = require('./listeners');


const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, PORT } = process.env

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET
})

registerListeners(app);

app.start(PORT || 9000)
  .then(async () => {
    console.log('Slack application started on 9000')
  })
  .catch(e => console.log(e))

