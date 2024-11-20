import httpClient from '../../../server/utils/httpClient.mjs';
import { htmlParser } from './htmlParser.mjs';

const parser = async () => {
  const dataFromGrBy = await httpClient.get('ru/construction/price_apartments/');
  return htmlParser(dataFromGrBy.data);
};

export default parser;
