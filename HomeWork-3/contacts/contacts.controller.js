const Joi = require("joi");
const { ContactModel } = require("./contacts.model");
Joi.objectId = require("joi-objectid")(Joi);

exports.validateCreateContact = function validateUpdateContact(req, res, next) {
  const body = req.body;

  const contactsRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    meta: Joi.object({
      comments: Joi.string(),
      likes: Joi.number(),
    }),
  });

  const validationResult = contactsRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
};

exports.createContact = async function createContact(req, res, next) {
  try {
    const user = req.body;

    const newUser = await ContactModel.createContactOne(user, { new: true });

    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async function getAllContacts(req, res, next) {
  try {
    const listContacts = await ContactModel.getAllContacts();

    return res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async function getAllContacts(req, res, next) {
  try {
    const { id } = req.params;
    const validationId = Joi.objectId();
    const validationResult = validationId.validate(id);

    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    const contact = await ContactModel.getContactById(id);

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
