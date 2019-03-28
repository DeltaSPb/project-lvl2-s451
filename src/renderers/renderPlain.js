import _ from 'lodash';

const sringify = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);
const pathToRoor = (path, key) => [...path, key].join('.').split(' ');

const typeAction = {
  nested: ({ key, children }, path, iter) => iter(children, pathToRoor(path, key)),
  added: ({ key, value }, path) => `Property '${pathToRoor(path, key)}' was added with value: ${sringify(value)}`,
  removed: ({ key }, path) => `Property '${pathToRoor(path, key)}' was removed`,
  changed: ({ key, oldValue, newValue }, path) => `Property '${pathToRoor(path, key)}' was updated. From ${sringify(oldValue)} to ${sringify(newValue)}`,
};

const render = (ast) => {
  const iter = (node, path) => node
    .filter(current => current.type !== 'unchanged')
    .map((current) => {
      const { type, ...args } = current;
      return typeAction[type](args, path, iter);
    });
  return _.flattenDeep(iter(ast, '')).join('\n');
};

export default render;
