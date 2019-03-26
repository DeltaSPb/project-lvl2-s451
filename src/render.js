import _ from 'lodash';

const tab = depth => '  '.repeat(depth * 2);
const space = depth => ' '.repeat(depth * 2);
const zip = (value, n) => `{\n${value}\n${tab(n)}}`;


const sringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const pairs = _.entries(value).map(([k, v]) => `${space(depth + 2)}${k}: ${sringify(v, depth)}`);
  return zip(pairs, depth);
};


const stateAction = {
  nasted: ({ key, children }, depth, render) => `${space(depth + 1)}${key}: ${render(children, depth + 1)}`,
  unchanged: ({ key, value }, depth) => `${space(depth)}  ${key}: ${sringify(value, depth)}`,
  added: ({ key, value }, depth) => `${space(depth)}+ ${key}: ${sringify(value, depth)}`,
  removed: ({ key, value }, depth) => `${space(depth)}- ${key}: ${sringify(value, depth)}`,
  changed: ({ key, oldValue, newValue }, depth) => `${space(depth)}- ${key}: ${sringify(oldValue, depth)}\n${space(depth)}+ ${key}: ${sringify(newValue, depth)}`,
};

const render = (ast, level = 1) => {
  const iter = (tree, depth) => tree.map((node) => {
    const { state, ...args } = node;
    return stateAction[state](args, depth, render);
  });
  return zip(iter(ast, level).join('\n'), level - 1);
};

export default render;
