import { getDataFromGrBuild } from '../services/building.service.mjs';
import { htmlParser } from './htmlParser.mjs';

const getDataForParsing = async () => {
  try {
    const dataFromGrBy = await getDataFromGrBuild();
    return htmlParser(dataFromGrBy.data);
  } catch (err) {
    console.log(err.message);
  }
};

export default getDataForParsing;
