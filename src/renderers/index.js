import renderTree from './renderTree';
import renderPlain from './renderPlain';

const renderTypes = {
  tree: renderTree,
  plain: renderPlain,
};

export default (ast, format) => renderTypes[format](ast);
