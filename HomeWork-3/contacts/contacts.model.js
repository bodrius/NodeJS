import { Schema, model } from "mongoose";

const metaSchema = new Schema(
  {
    comments: { type: String },
    likes: { type: Number },
  },
  {
    timestamps: true,
  }
);

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    meta: {
      type: metaSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.statics.createContactOne = createContactOne;
contactSchema.statics.getAllContacts = getAllContacts;
contactSchema.statics.getContactById = getContactById;
// contactSchema.static.updateContact = updateContact;
// contactSchema.static.deleteContact = deleteContact;

//collection name -->> contacts
export const ContactModel = model("Contact", contactSchema);

async function createContactOne(contactParams) {
  return this.create(contactParams);
}

async function getAllContacts() {
  return this.find();
}

async function getContactById(contactId) {
  return this.findById(contactId);
}

async function updateContact(contactId, contactParams) {
  return this.findByIdAndUpdate(
    contactId,
    {
      $set: contactParams,
    },
    { new: true }
  );
}

async function deleteContact(contactId) {
  return this.findByIdAndDelete(contactId);
}
