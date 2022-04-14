const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ContactModel } = require("./contacts.model");

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

exports.validateUpdateContact = async function validateUpdateContact(
  req,
  res,
  next
) {
  const toValidate = {
    body: req.body,
    params: req.params,
  };

  const contactRules = Joi.object({
    params: { id: Joi.objectId() },
    body: { name: Joi.string(), email: Joi.string() },
  });

  const validationResult = contactRules.validate(toValidate);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }
  next();
};

exports.updateContact = async function updateContact(req, res, next) {
  try {
    const contactId = req.params.id;

    const updateContact = await ContactModel.updateContact(
      contactId,
      req.body,
      { new: true }
    );

    return res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const validationId = Joi.objectId();
    const validationResult = validationId.validate(id);

    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    await ContactModel.deleteContact(id);

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
