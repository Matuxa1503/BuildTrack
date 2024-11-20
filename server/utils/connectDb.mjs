import mongoose from 'mongoose';

const connectDb = () => {
  const URL = 'mongodb://localhost:27017/BuildingsData';
  mongoose
    .connect(URL)
    .then(console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));
};

export default connectDb;
