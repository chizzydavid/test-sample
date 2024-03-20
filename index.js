require('dotenv').config()
const { App } = require('@slack/bolt')
const { registerListeners } = require('./listeners');
const nodeCron = require("node-cron");
const bodyParser = require('body-parser')

// const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, PORT } = process.env

// const app = new App({
//   token: SLACK_BOT_TOKEN,
//   signingSecret: SLACK_SIGNING_SECRET,
//   customRoutes: [
//     {
//       path: '/health-check',
//       method: ['GET'],
//       handler: (req, res) => {
//         res.writeHead(200);
//         res.end(`Ok!`);
//       },
//     },
//   ]  
// })


// registerListeners(app);

// app.start(PORT || 8000)
//   .then(async () => {
//     console.log('Slack application started on 8000')
//     nodeCron.schedule("*/10 * * * *", async () => { 
//     // nodeCron.schedule("* * * * *", async () => {
//       console.log('Node cron runnning on 8000')
//       try {
//         const res = await axios.get('https://test-sample-o4pz.onrender.com/health-check')
//         console.log('data from render dependenceis', res.data, new Date().toLocaleString())
//       } catch(e) {
//         console.log("Error hitting thy endpoint", e.response, 'the endpoint oof the error lineeeeeeee')
//       }
//     });
//   }) 
//   .catch(e => console.log(e, "are you getting here"))



// const express = require('express')
// const app = express()

// const PORT = process.env.PORT || 6000

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// let num = 0;

// app.get('/', (req, res) => {
//   console.log('health check')
//   res.send('Service Okay')
// })

// app.post('/update-number', (req, res) => {
//   const { number } = req.body;
//   if (!isNaN(number)) {
//     num += number
//   } 
//   console.log('request received', req.body, num)
//   res.json({
//     data: num
//   })
// })

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })







const http  = require('http');
const express = require('express')
const app = express()

const PORT = process.env.PORT || 7001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let num = 0;

app.get('/', (req, res) => {
  console.log('health check endpoint')
  res.send('Service Okay')
})

app.post('/update-number', (req, res) => {
  const { number } = req.body;
  if (!isNaN(number)) {
    num += number
  } 
  console.log('request received', req.body, num)
  res.json({
    data: num
  })
})


const server = http.createServer(app);

server.listen(PORT);

server.on('listening', async () => {
  console.log(`Application is listening on port ${PORT}`);
});

server.on('close', () => {
  console.log('Application server closed');
});



