import path from 'path';
import readFile from './readFile.mjs';
import hasJsonFile from './hasJsonFile.mjs';
import writeFile from './writeFile.mjs';
import elemsFromData from './elemsFromData.mjs';

const filterAndWriteJson = async (parsedData) => {
  const __dirname = path.resolve();
  const pathJson = path.join(__dirname, 'src', 'data.json');
  const hasJson = await hasJsonFile(pathJson);

  if (hasJson) {
    const readData = await readFile(pathJson);
    const newEl = await elemsFromData(parsedData, readData);
    // await writeFile(pathJson, parsedData);
    // return newEl;
  } else {
    await writeFile(pathJson, parsedData);
    return [];
  }
};

export default filterAndWriteJson;
