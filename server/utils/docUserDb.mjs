import getBuildingsDb from './getBuildingsDb.mjs';

const docUserDb = async (link) => {
  try {
    const buildings = await getBuildingsDb();
    const document = buildings.items.find((item) => item.data.link === link);
    return document;
  } catch (err) {
    console.error('Error getting document from Db:', err.message);
  }
};

export default docUserDb;
