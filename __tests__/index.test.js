import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filesArr = [
  ['before.json', 'after.json', 'result.txt'],
  ['before.yaml', 'after.yaml', 'result.txt'],
  ['before.ini', 'after.ini', 'result.txt'],
  ['before_nested.json', 'after_nested.json', 'result_nested.txt'],
  ['before_nested.yaml', 'after_nested.yaml', 'result_nested.txt'],
  ['before_nested.ini', 'after_nested.ini', 'result_nested.txt'],
];

test.each(filesArr)('genDiff(%s, %s)', (fileBefore, fileAfter, result) => {
  const pathToBeforeFile = path.resolve(__dirname, `__fixtures__/${fileBefore}`);
  const pathToAfterFile = path.resolve(__dirname, `__fixtures__/${fileAfter}`);
  const pathToResult = path.resolve(__dirname, `__fixtures__/${result}`);

  const expected = fs.readFileSync(pathToResult, 'utf8').trim();
  expect(genDiff(pathToBeforeFile, pathToAfterFile)).toEqual(expected);
});
