const storage = require('electron-json-storage');

function addContactRow(name='',number='',row) {  
  const sendSwitch = $(`<span class="switch switch-small"><input type="checkbox" class="switch" id="switch-${row}"><label for="switch-${row}"></label></span>`);
  const nameField = $(`<span class='name input' contenteditable='true'>${name}</span>`);
  const numberField = $(`<span class='number input' contenteditable='true'>${number}</span>`)
  const removeButton = $("<span class='remove button'>Remove</span>");
  const contactRow = $(`<div class='contact input-single' id='row-${row}'></div>`);
  contactRow.append(sendSwitch).append(nameField).append(numberField).append(removeButton);
  $('#contacts .contact_list').append(contactRow);
  numberField.on('input', saveContactData );
  nameField.on('input', saveContactData );
  sendSwitch.find('input').click(doSwitch);
  removeButton.click( () => { 
    contactRow.remove();
    saveContactData();
  });
}

function saveContactData() {
  storage.set('contacts', contactData(), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

function contactData() {
  return $('#contacts .contact_list .contact').toArray().map( el => { 
    return {
      name: $(el).find('.name').text(),
      number: $(el).find('.number').text(),
      selected: $(el).find('.switch input').is(':checked')
    }
  });
}

function newContact() {
  addContactRow();
}

function loadContacts() {
  storage.get('contacts', (err,contacts) => {
    if( contacts.length ){
      contacts.forEach( (contact,row) => {
        addContactRow(contact.name, contact.number,row);
      });
    }
  });
}

function selectedContacts() {
  return contactData().filter( c => c.selected );
}

function doSwitch() {
    $('#send_message')
      .prop('disabled',selectedContacts().length === 0 )
      .text(`Send message to ${selectedContacts().length} recipients`);
}

function clearSelectedContacts() {
  $('#contacts .contact_list input:checkbox:checked').prop('checked', false);
  doSwitch();
}

$('#new_contact').click(newContact);
loadContacts();
doSwitch();

module.exports = { selectedContacts, clearSelectedContacts };