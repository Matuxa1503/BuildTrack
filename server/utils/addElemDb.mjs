import { BuildingItem, Buildings } from '../../models/Buildings.mjs';

const addElemDb = async (elemsArr, id) => {
  try {
    for (const el of elemsArr) {
      const building = new BuildingItem(el);
      await building.validate();
      await Buildings.findByIdAndUpdate(id, { $push: { items: building } }, { new: true });
    }
  } catch (err) {
    console.error('Error adding elements:', err.message);
  }
};

export default addElemDb;
