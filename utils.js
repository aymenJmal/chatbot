const request = require('request');

let pages = {};
pages['test'] = {
  token: 'test',
  name: 'test'
};

module.exports = {
  getPage: function(page_id) {
    return pages[page_id];
  },
  sendTextMessage: function(page_id, sender, text) {
    let messageData = { text:text }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: this.getPage(page_id).token },
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }
};
