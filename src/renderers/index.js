import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJSON from './renderJSON';

const renderTypes = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJSON,
};

export default (ast, format) => renderTypes[format](ast);
