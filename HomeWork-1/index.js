const {
  getContactById,
  removeContact,
  addContact,
  listContacts,
} = require("./contact");

listContacts();

getContactById("4");

removeContact("5");

addContact("4", "Bogdan", "bogdanpechenyk@gmail.com", "+380950242412");

listContacts();
