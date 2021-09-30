// import { MongoClient } from "mongodb";

// async function handler(req, res) {
//   if (req.method === 'POST') {
//     const data = req.body;
//     console.log(data);
//     // const { title, image, address, description } = data;

//     const client = await MongoClient.connect("mongodb+srv://abhishekkaran212:@Aabhishek04121998@cluster0.fygio.mongodb.net/meetups?retryWrites=true&w=majority");
//     const db = client.db;
//     const meetupsCollection = db.collection("meetups");

//     const result = await meetupsCollection.insertOne(data);

//     console.log(result);
//     client.close();

//     res.status(201).json({ message: "meetup inserted!" });
//   }
// }

// export default handler;
import { connectToDatabase } from "../../lib/mongodb";
export default async (req, res) => {
  try {
    const data = req.body;
    const { db } = await connectToDatabase();
    const meetups = await db.collection("meetups").insertOne(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err})
  }
  res.status(201).json({ message: "meetup inserted!" });
};
