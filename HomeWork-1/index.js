const {
  addContact,
  listContacts,
  removeContact,
  getContactById,
} = require("./contact");

const argv = require("yargs").argv;

listContacts();

getContactById("4");

removeContact("5");

addContact("4", "Bogdan", "bogdanpechenyk@gmail.com", "+380950242412");

listContacts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(id, name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
