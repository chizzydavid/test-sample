require('dotenv').config()
const { App } = require('@slack/bolt')
const { registerListeners } = require('./listeners');
const nodeCron = require("node-cron");
const axios = require('axios')

const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, PORT } = process.env

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  customRoutes: [
    {
      path: '/health-check',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end(`Ok!`);
      },
    },
  ]  
})

registerListeners(app);

app.start(PORT || 8000)
  .then(async () => {
    console.log('Slack application started on 8000')
  }) 
  .catch(e => console.log(e, "are you getting here"))

