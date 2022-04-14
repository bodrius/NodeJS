const { MongoClient } = require("mongodb");

const URL =
  "mongodb+srv://triopoly:triopoly-01@firstcluster.4kc8m.mongodb.net/mongo-db?retryWrites=true&w=majority";

const client = new MongoClient(URL);

const DB_NAME = "DBUsers";

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(DB_NAME);
    const collection = db.collection("COLLUsers");

    const deleteUser = await collection.deleteOne({ id: "1" });

    const findUser = await collection.find({ name: "Cyrus Jackson" }).toArray();

    const totalSizeCollection = (await collection.stats())?.count;

    const updateUser = await collection.updateOne(
      { id: "5" },
      { $set: { id: "55" } }
    );

    const findUsers = await collection
      .find({ name: "Cyrus Jackson" })
      .toArray();

    // const createUser = await collection.insertOne({
    //   id: "11",
    //   name: "Bogdan",
    //   email: "dfgsdf@adsf.sadf",
    //   phone: "+380950123476",
    // });

    const findQuery = await collection
      .find({
        $or: [{ name: { $regex: "ogdan" } }, { email: { $regex: "pharetra" } }],
        id: "11",
      })
      .toArray();

    return "done.";
  } catch (error) {
    console.log("error==>>", error);
  }
}

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
