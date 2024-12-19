import { BuildingItem, Buildings } from '../models/Buildings.mjs';

const addElemDb = async (elemsArr, idMongo) => {
  try {
    for (const el of elemsArr) {
      const building = new BuildingItem(el);
      await building.validate();
      await Buildings.findByIdAndUpdate(idMongo, { $push: { items: building } }, { new: true });
    }
  } catch (err) {
    console.error('Error adding elements in Db:', err.message);
  }
};

export default addElemDb;
