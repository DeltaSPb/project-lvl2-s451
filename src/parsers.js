import yaml from 'js-yaml';
import ini from 'ini';

const formatToParse = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (extention, content) => formatToParse[extention](content);
