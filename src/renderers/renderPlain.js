import _ from 'lodash';

const sringify = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const typeAction = {
  nested: (path, { children }, iter) => iter(children, `${path}.`),
  added: (path, { value }) => `Property '${path}' was added with value: ${sringify(value)}`,
  removed: path => `Property '${path}' was removed`,
  changed: (path, { oldValue, newValue }) => `Property '${path}' was updated. From ${sringify(oldValue)} to ${sringify(newValue)}`,
};

const render = (ast) => {
  const iter = (node, path) => node
    .filter(current => current.type !== 'unchanged')
    .map((current) => {
      const newPath = `${path}${current.key}`;
      const { type, ...args } = current;
      return typeAction[type](newPath, args, iter);
    });
  return _.flattenDeep(iter(ast, '')).join('\n');
};

export default render;
