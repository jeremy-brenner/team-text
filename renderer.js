window.$ = window.jQuery = require('jquery');

const { selectedContacts, clearSelectedContacts } = require('./app/contacts');
const { sendMessageTo } = require('./app/message');

$('#send_message').click( () => {
  sendMessageTo(selectedContacts());
  clearSelectedContacts();
});