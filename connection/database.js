import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "mongodb+srv://mrquick:adminsidemrquick111@cloudsourcing.kmb2zsa.mongodb.net/?retryWrites=true&w=majority&appName=CloudSourcing";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});  

try {
  // Connect the client to the server
  await client.connect();
  useNewUrlParser: true;
  useUnifiedTopology: true 
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("MrQuick");

export default db;