import { getDataFromGrBuildAPI } from '../../api/api.mjs';
import { htmlParser } from './htmlParser.mjs';

const parser = async () => {
  try {
    const dataFromGrBy = await getDataFromGrBuildAPI();
    return htmlParser(dataFromGrBy.data);
  } catch (err) {
    console.log(err.message);
  }
};

export default parser;
