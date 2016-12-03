const request = require('request');

let pages = {};
pages['513774525497834'] = {
  token: 'EAAE5KK8ajkQBAA5KEgv5wP0EeZAZAhm6YWHmZA2m1zzCwmP2sNENFqrzAx7LMArB5A55YNw2csdbBw4aySHEeoTtzym5k2ZCIOU8RDc7tVbfRBiHZC1l04mEfMZAlJOUDMZCSDkJLG0nU5ciEe76SExWLzzQ4nCzp3Rog0E9f7xNgZDZD',
  name: 'IpponLab'
};
pages['493246800721372'] = {
  token: 'EAAE5KK8ajkQBAF2JEqfuIBMZCJ8QJGlCh0aBvw4qT76V0uCBmagxs8dXefd7puvWYSrouCgWKmY70ZBhfdtKxauWgsAm7p1MOEcCv346HkEiClKhz6CIUEdZCEGDxI1hi9vWJaW7oBuROUNIZA3XsY44JnOoZBMHJdmqLCf0xmQZDZD',
  name: 'UTOF'
}

module.exports = {
  getPage: function (page_id) {
    return pages[page_id];
  },
  sendTextMessage: function (page_id, sender, text) {
    let messageData = {text: text};
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: this.getPage(page_id).token},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: messageData,
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    })
  },
  sendGenericMessage: function (page_id, sender) {
    let messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "First card",
            "subtitle": "Element #1 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [{
              "type": "web_url",
              "url": "https://www.messenger.com",
              "title": "web url"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          }, {
            "title": "Second card",
            "subtitle": "Element #2 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
            "buttons": [{
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for second element in a generic bubble",
            }],
          }]
        }
      }
    };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: this.getPage(page_id).token},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: messageData,
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
};
