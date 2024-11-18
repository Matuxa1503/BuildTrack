import { Buildings } from '../../models/Buildings.mjs';

const createUser = async (parsedData, userId) => {
  const user = { userId, items: parsedData };
  const building = new Buildings(user);
  await building.save();
};

export default createUser;
