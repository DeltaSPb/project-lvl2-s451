import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renders/render';
import buildAst from './buildAst';


const readAndParse = (pathToCurrent) => {
  const content = fs.readFileSync(pathToCurrent, 'utf-8');
  const extention = path.extname(pathToCurrent);
  return parse(extention, content);
};

export default (pathToFile1, pathToFile2, format) => {
  const data1 = readAndParse(pathToFile1);
  const data2 = readAndParse(pathToFile2);
  const ast = buildAst(data1, data2);
  return render(ast, format);
};
