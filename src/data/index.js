import DATA from './index.json';
import { getRandomValue } from '../utils/getRandomValue.js';

export const getTask = () => {
  return getRandomValue(DATA.tasks);
};

export const getList = () => DATA.tasks;
