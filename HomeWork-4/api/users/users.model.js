import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    token: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

usersSchema.statics.findByEmail = findByEmail;
usersSchema.statics.createUser = createUser;
usersSchema.statics.updateUser = updateUser;

async function findByEmail(email) {
  return this.findOne({ email });
}

async function createUser(userName, email, passwordHash) {
  return this.create({ userName, email, passwordHash });
}

async function updateUser(id, setFields) {
  return this.findByIdAndUpdate(
    id,
    {
      $set: setFields,
    },
    {
      new: true,
    }
  );
}

// collection name ->> users
export const UserModel = mongoose.model("User", usersSchema);
