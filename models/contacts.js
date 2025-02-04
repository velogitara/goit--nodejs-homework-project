const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const updateContacts = require('./UpdateContacts');

const { checkFieldHandler } = require('../helpers');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();

  const result = contacts.find(item => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};
const addContact = async body => {
  const contacts = await listContacts();
  const sameName = await checkFieldHandler(body);

  const result = await sameName(contacts).then(res => {
    return res;
  });
  console.log('33-я строка', result);

  if (result !== -1) {
    const error = new Error();
    error.status = 400;
    error.message = 'Error: same name, contact not added!';
    throw error;
  }
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removeContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
