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

// router.get("/:contactId", async (req, res, next) => {
//   try {
//   } catch (error) {
//     res.status(501).json({ message: "internal server error" });
//   }
// });

// // U - update
// router.put("/:contactId", async (req, res, next) => {
//   try {
//   } catch (error) {
//     res.status(501).json({ message: "internal server error" });
//   }
// });

// // D - delete
// router.delete("/:contactId", async (req, res, next) => {
//   try {
//   } catch (error) {
//     res.status(501).json({ message: "internal server error" });
//   }
// });

module.exports = router;
