import path from 'path';
import readFile from './readFile.mjs';

const getLastEl = async () => {
  const __dirname = path.resolve();
  const pathJson = path.join(__dirname, 'src', 'data.json');

  const readData = await readFile(pathJson);
  const firstEl = JSON.parse(readData)[0];
  return firstEl;
};

export default getLastEl;
