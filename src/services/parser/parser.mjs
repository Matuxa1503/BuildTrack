import { httpClient } from '../../api/api.mjs';
import { htmlParser } from './htmlParser.mjs';

const parser = async () => {
  try {
    const dataFromGrBy = await httpClient.get('ru/construction/price_apartments/');
    return htmlParser(dataFromGrBy.data);
  } catch (err) {
    console.log(err.message);
  }
};

export default parser;
