import { camelCase } from '@/utils/tools';
const context = require.context('./modules', false, /\.ts$/);

const exportJson: any = {};

context.keys().forEach(filePath => {
  const name = filePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const mName = camelCase(`use-${name}-Store`);
  exportJson[mName] = context(filePath);
});

export default exportJson;
