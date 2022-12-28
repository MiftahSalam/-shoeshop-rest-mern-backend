// import { MongoClient } from 'mongodb';

// const connectDatabase = async () => {
//   var uri =
//     'mongodb://miftah:H47LfoJpN2HDJYns@cluster0-shard-00-00.mtq1q.mongodb.net:27017,cluster0-shard-00-01.mtq1q.mongodb.net:27017,cluster0-shard-00-02.mtq1q.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ntgfh-shard-0&authSource=admin&retryWrites=true&w=majority';
//   MongoClient.connect(uri, function (err, client) {
//     if (err) {
//       console.log('err: ', err);
//       throw err;
//     }
//     const collection = client.db('shoeshop');
//     console.log('mongo client: ', client);
//     // perform actions on the collection object
//     // client.close();
//   });
// };
// const connectDatabase = async () => {
//   const uri = process.env.MONGO_URL;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
//   console.log('uri: ', uri);

//   await client.connect();

//   // client.connect((err) => {
//   //   const collection = client.db('shoeshop');
//   //   client.close();
//   //   throw err;
//   // });

import mongoose from 'mongoose';

const connectDatabase = async () => {
  mongoose.connect(process.env.MONGO_URL);
};

export default connectDatabase;
