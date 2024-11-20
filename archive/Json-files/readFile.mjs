import fs from 'fs/promises';

const readFile = async (path) => {
  try {
    const dataFile = await fs.readFile(path, 'utf-8');
    return dataFile;
  } catch (err) {
    return err.message;
  }
};

export default readFile;
