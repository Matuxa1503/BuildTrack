import mongoose from 'mongoose';

const mongoConnect = () => {
  const uri = 'mongodb+srv://Matuxa:19801103Cure@cluster0.i2sz2.mongodb.net/BuildingsData?retryWrites=true&w=majority&appName=Cluster0';
  mongoose
    .connect(uri)
    .then(console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));
};

export default mongoConnect;
