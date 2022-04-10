const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(contacts);
  } catch (error) {
    console.log("ERROR listContacts->", error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const findContact = contacts.find((element) => element.id === contactId);

    return findContact;
  } catch (error) {
    console.log("ERROR getContactById->", error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const removeContact = contacts.filter(
      (element) => element.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(removeContact));

    return console.log("CONTACT SUCCESSFULLY REMOVED!");
  } catch (error) {
    console.log("ERROR removeContact->", error);
  }
}

async function addContact(id, name, email, phone) {
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  try {
    const list = await listContacts();

    list.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(list));

    return console.log("CONTACT SUCCESSFULLY ADDED!");
  } catch (error) {
    console.log("ERROR addContact->", error);
  }
}

module.exports = {
  addContact,
  removeContact,
  listContacts,
  getContactById,
};
