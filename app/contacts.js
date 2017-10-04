const fs = require('fs');

function addContactRow(name='',number='') {   
  const nameField = $(`<span class='name input' contenteditable='true'>${name}</span>`);
  const numberField = $(`<span class='number input' contenteditable='true'>${number}</span>`)
  const removeButton = $("<span class='remove button'>Remove</span>");
  const contactRow = $("<div class='contact'></div>");
  contactRow.append(nameField).append(numberField).append(removeButton);
  $('#contacts .contact_list').append(contactRow);
  numberField.on('input', saveContactData );
  nameField.on('input', saveContactData );
  removeButton.click( () => { 
    contactRow.remove();
    saveContactData();
  });
}

function saveContactData() {
  fs.writeFile('./data/contacts.json', JSON.stringify(contactData()), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

function contactData() {
  return $('#contacts .contact_list .contact').toArray().map( el => { 
    return {
      name: $(el).find('.name').text(),
      number: $(el).find('.number').text() 
    }
  });
}

function newContact() {
  addContactRow();
}

function loadContacts() {
  const contacts = require('../data/contacts.json');
  contacts.forEach( contact => {
     addContactRow(contact.name, contact.number);
  });
}

$('#new_contact').click(newContact);
loadContacts();

module.exports = { contactData };