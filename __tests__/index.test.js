import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesArr = [
  ['before.json', 'after.json'],
  ['before.yaml', 'after.yaml'],
  ['before.ini', 'after.ini'],
];

test.each(filesArr)('genDiff(%s, %s)', (fileBefore, fileAfter) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${fileBefore}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${fileAfter}`);
  const pathToResult = path.resolve(__dirname, '__fixtures__/result.txt');

  const expected = fs.readFileSync(pathToResult, 'utf8').trim();
  expect(genDiff(pathToBeforeFile, pathToAfterFile)).toEqual(expected);
});
