'use strict'

const express = require('express');
const bodyParser = require('body-parser');

let tools = require('./utils');

const app = express();
app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('Hello world, I am a chat bot');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});


function sendWelcomeMsg(page_id, sender_id) {
  tools.sendTextMessage(page_id, sender_id, 'Bienvenue sur notre page');
}

app.post('/webhook/', function (req, res) {
  const PAGE_ID = req.body.entry[0].id;
  const messaging_events = req.body.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
    const event = req.body.entry[0].messaging[i];
    const SENDER_ID = event.sender.id;
    if (event.message && event.message.text) {
      let text = event.message.text;
      tools.sendTextMessage(PAGE_ID, SENDER_ID, 'PAGE_ID: ' + PAGE_ID);
      tools.sendTextMessage(PAGE_ID, SENDER_ID, 'PAGE_NAME: ' + tools.getPage(PAGE_ID).name);
      tools.sendTextMessage(PAGE_ID, SENDER_ID, 'SENDER_ID: ' + SENDER_ID);
      tools.sendTextMessage(PAGE_ID, SENDER_ID, 'TEXT: ' + text.substring(0, 200));
      tools.sendGenericMessage(PAGE_ID, SENDER_ID);
    } else {
      tools.sendTextMessage(PAGE_ID, SENDER_ID, 'messaging_events ' + JSON.stringify(messaging_events));
      break;
    }
  }
  res.sendStatus(200)
});

// Spin up the server
app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
});