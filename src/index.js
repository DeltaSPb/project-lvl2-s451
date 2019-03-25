import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

const readAndParse = (pathToCurrent) => {
  const content = fs.readFileSync(pathToCurrent, 'utf-8');
  const extention = path.extname(pathToCurrent);
  return parse(extention, content);
};

const existence = [
  {
    check: (key, obj1) => !_.has(obj1, key),
    difference: (key, obj1, obj2) => `+ ${key}: ${obj2[key]}`,
  },
  {
    check: (key, obj1, obj2) => !_.has(obj2, key),
    difference: (key, obj1) => `- ${key}: ${obj1[key]}`,
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    difference: (key, obj1) => `    ${key}: ${obj1[key]}`,
  },
  {
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    difference: (key, obj1, obj2) => [[`- ${key}: ${obj1[key]}`], [`+ ${key}: ${obj2[key]}`]],
  },
];

const diffToString = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.map((key) => {
    const { difference } = existence.find(({ check }) => check(key, obj1, obj2));
    return difference(key, obj1, obj2);
  });
  return `{\n${_.flattenDeep(result).join('\n  ')}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const obj1 = readAndParse(pathToFile1);
  const obj2 = readAndParse(pathToFile2);
  return diffToString(obj1, obj2);
};
