import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.xp3cg.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup inserted!",
    });

    return;
  }
}

export default handler;
