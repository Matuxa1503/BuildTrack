import { BuildingItem, Buildings } from '../models/Buildings.mjs';

export const addBuildingsDb = async (elemsArr, idMongo) => {
  try {
    for (const el of elemsArr) {
      const building = new BuildingItem(el);
      await building.validate();
      await Buildings.findByIdAndUpdate(idMongo, { $push: { items: building } }, { new: true });
    }
    return true;
  } catch (err) {
    console.error('Error adding elements in Db:', err.message);
  }
};

export const getBuildingsDb = async () => {
  try {
    return await Buildings.findOne();
  } catch (err) {
    console.error('Error getBuildingsDb:', err.message);
  }
};

export const getBuildingDb = async (link) => {
  try {
    const buildings = await getBuildingsDb();
    const document = buildings.items.find((item) => item.data.link === link);
    console.log('getBuildingDb', document);
    return document;
  } catch (err) {
    console.error('Error getting document from Db:', err.message);
  }
};

export const getLastBuildingDb = async () => {
  try {
    return await Buildings.findOne({}, { items: { $slice: -1 } });
  } catch (err) {
    console.error('Error getting last element from Db:', err.message);
  }
};
