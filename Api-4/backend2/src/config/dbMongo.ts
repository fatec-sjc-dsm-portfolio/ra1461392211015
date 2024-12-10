// mongodbConnection.ts
import { MongoClient as Mongo, Db, Collection, ServerApiVersion } from 'mongodb';

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    // const url = process.env.MONGODB_URL || "localhost:27017";
    // const username = process.env.MONGODB_USERNAME;
    // const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo("mongodb+srv://neocodeapi:fatec@cluster0.l4elctr.mongodb.net/");
    const db = client.db("mongodb");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  },
};


// class MongoDBConnection {
//   private db: Db;
//   private collection: Collection;

//   constructor() {
//     const uri = "mongodb+srv://neocodeapi:fatec@cluster0.l4elctr.mongodb.net/";
//     const client = new MongoClient(uri,  {
//       serverApi: {
//           version: ServerApiVersion.v1,
//           strict: true,
//           deprecationErrors: true,
//       }
//   }
// );

//     client.connect()
//       .then(() => {
//         this.db = client.db('mongodb');
//         this.collection = this.db.collection('dadosEstacao');
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//       })
//       .catch(err => {
//         console.error('Erro ao conectar ao MongoDB:', err);
//       });
//   }

//   getCollection() {
//     return this.collection;
//   }
  
// }



// export default new MongoDBConnection();
