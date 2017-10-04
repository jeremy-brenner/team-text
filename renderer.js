window.$ = window.jQuery = require('jquery');

const { contactData } = require('./app/contacts');
const { sendMessageTo } = require('./app/message');

$('#send_message').click( () => {
  sendMessageTo(contactData());
});