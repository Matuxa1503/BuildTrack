import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  data: {
    title: { type: String, required: true },
    dateBuild: { type: String, required: true },
    link: { type: String, required: true },
    someInfoBuild: [String],
  },
  table: {
    header: [{ text: { type: String } }],
    subHeader: [{ text: { type: String } }],
    rows: [
      {
        floor: { type: String },
        unit: { type: String },
        prices: [String],
      },
    ],
  },
});

const UsersSchema = new mongoose.Schema({
  userId: { type: Number },
  chatId: { type: Number },
});

const BuildingsSchema = new mongoose.Schema({
  // userId: { type: Number },
  items: [ItemSchema],
});

export const Buildings = mongoose.model('Buildings', BuildingsSchema);
export const Users = mongoose.model('Users', UsersSchema);
export const BuildingItem = mongoose.model('BuildingItem', ItemSchema);
