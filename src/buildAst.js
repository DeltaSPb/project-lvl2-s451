import _ from 'lodash';

const existence = [
  {
    check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    difference: (key, obj1, obj2, fn) => ({ type: 'nested', key, children: fn(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1) => !_.has(obj1, key),
    difference: (key, obj1, obj2) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj2, key),
    difference: (key, obj1) => ({ type: 'removed', key, value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    difference: (key, obj1) => ({ type: 'unchanged', key, value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    difference: (key, obj1, obj2) => ({
      type: 'changed', key, oldValue: obj1[key], newValue: obj2[key],
    }),
  },
];

const checkExistence = (key, obj1, obj2) => existence.find(({ check }) => check(key, obj1, obj2));

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const ast = keys.reduce((acc, key) => {
    const { difference } = checkExistence(key, obj1, obj2);
    return [...acc, difference(key, obj1, obj2, buildAst)];
  }, []);
  return ast;
};
export default buildAst;
