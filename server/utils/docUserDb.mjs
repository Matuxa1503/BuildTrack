import getUserDb from './getUserDb.mjs';

const docUserDb = async (userId, link) => {
  try {
    const user = await getUserDb(userId);
    const document = user.items.find((item) => item.data.link === link);
    return document;
  } catch (err) {
    console.error('Error getting document from Db:', err.message);
  }
};

export default docUserDb;
