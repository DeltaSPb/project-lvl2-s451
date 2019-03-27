import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesArr = [
  ['before.json', 'after.json', 'tree', 'resultTree.txt'],
  ['before.yaml', 'after.yaml', 'tree', 'resultTree.txt'],
  ['before.ini', 'after.ini', 'tree', 'resultTree.txt'],
  ['before.json', 'after.json', 'plain', 'resultPlain.txt'],
  ['before.yaml', 'after.yaml', 'plain', 'resultPlain.txt'],
  ['before.ini', 'after.ini', 'plain', 'resultPlain.txt'],
];

test.each(filesArr)('genDiff(%s, %s)', (fileBefore, fileAfter, format, result) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${fileBefore}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${fileAfter}`);
  const pathToResult = path.resolve(__dirname, `__fixtures__/${result}`);

  const expected = fs.readFileSync(pathToResult, 'utf8').trim();
  expect(genDiff(pathToBeforeFile, pathToAfterFile, format)).toEqual(expected);
});
