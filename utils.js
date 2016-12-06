const request = require('request');

let pages = {};
pages['test'] = {
  token: 'test',
  name: 'test'
};

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
