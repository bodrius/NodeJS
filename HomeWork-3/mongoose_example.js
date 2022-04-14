const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGODB_URL =
  "mongodb+srv://triopoly:triopoly-01@firstcluster.4kc8m.mongodb.net/mongo-db?retryWrites=true&w=majority";

async function initDataBase() {
  try {
    await mongoose.connect(MONGODB_URL);

    const contactSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now() },
      comments: [{ body: String, date: Date }],
      meta: {
        votes: Number,
        likes: Number,
      },
    });

    //collection name contacts
    const ContactsModel = mongoose.model("Contact", contactSchema);

    // const user = await ContactsModel.create({
    //   name: "Triopoly",
    //   email: "dfgdfgdfg@dgdfg.com",
    //   password: "qwerty",
    //   comments: { body: "body contact", date: Date.now() },
    //   meta: {
    //     votes: 5,
    //     likes: 77,
    //   },
    // });

    // const findContactById = await ContactsModel.findById(
    //   "62559d8bd56ed7d42d088597"
    // );

    // const updateIncrementUser = await ContactsModel.updateOne(
    //   {
    //     _id: "62559cba820ce280a27e62d3",
    //   },
    //   { $inc: { "meta.likes": 1 } }
    // );
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = {
  initDataBase,
};
