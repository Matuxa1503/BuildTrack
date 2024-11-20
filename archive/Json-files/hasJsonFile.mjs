import fs from 'fs/promises';

const hasJsonFile = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
};

export default hasJsonFile;
