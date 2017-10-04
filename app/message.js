const AWS = require('aws-sdk');
AWS.config.loadFromPath('./data/credentials.json');
const sns = new AWS.SNS({apiVersion: '2010-03-31'});

function sendMessageTo(contacts) {
    contacts.forEach(sendMessage);
}

function sendMessage(contact) {
  const message = $('#message .message').text();
  console.log(message,contact.number);
  sns.publish({Message:message,PhoneNumber:contact.number}).promise()
    .then( s => {
        console.log(s);
    });
}

module.exports = { sendMessageTo };