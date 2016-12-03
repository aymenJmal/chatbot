'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

import { getPages, sendTextMessage } from './utils';

const app = express();
app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot');
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
})

app.post('/webhook/', function (req, res) {
	const PAGE_ID = req.body.entry[0].id;
    const messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        const event = req.body.entry[0].messaging[i];
        const SENDER_ID = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            sendTextMessage(PAGE_ID, SENDER_ID, 'PAGE_ID: ' + PAGE_ID);
            sendTextMessage(PAGE_ID, SENDER_ID, 'PAGE_NAME: ' + getPage(PAGE_ID).name);
            sendTextMessage(PAGE_ID, SENDER_ID, 'SENDER_ID: ' + SENDER_ID);
            sendTextMessage(PAGE_ID, SENDER_ID, 'TEXT: ' + text.substring(0, 200));
        }
    }
    res.sendStatus(200)
})
const token = "FB_TOKEN";

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})