import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

const mongoConnect = () => {
  const uri = process.env.MONGO_CONNECT;
  mongoose
    .connect(uri)
    .then(console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));
};

export default mongoConnect;
