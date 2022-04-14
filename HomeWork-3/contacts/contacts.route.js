const express = require("express");
const router = express.Router();

const ContactsController = require("./contacts.controller");

// C - create
router.post(
  "/",
  ContactsController.validateCreateContact,
  ContactsController.createContact
);

// R - read
router.get("/", ContactsController.getAllContacts);

router.get("/:id", ContactsController.getContactById);

// U - update
router.put(
  "/:id",
  ContactsController.validateUpdateContact,
  ContactsController.updateContact
);

// D - delete
router.delete("/:id", ContactsController.deleteContact);

module.exports = router;
