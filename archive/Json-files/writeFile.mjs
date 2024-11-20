import fs from 'fs/promises';

const writeFile = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    return console.log(err.message);
  }
};

export default writeFile;
