const {watch} = require('./watch');
const servor = require('servor');

const devServor = async opts => {
  const inst = await servor(opts);

  /* eslint-disable-next-line no-console */
  console.log(`
  🗂  Serving:\t${inst.root}\n
  🏡 Local:\t${inst.url}
  ${inst.ips
    .map(ip => `📡 Network:\t${inst.protocol}://${ip}:${inst.port}`)
    .join('\n  ')}
  `);

  return inst.reload;
};

module.exports.serve = ({
  srcDir = './src',
  tmpDir = './tmp',
  destDir = './dist',
  pageMap,
  hooks = [],
  afterBuild = () => {},
  servorOptions = {},
} = {}) => {
  devServor({root: destDir, ...servorOptions}).then(reload =>
    watch({
      srcDir,
      tmpDir,
      destDir,
      pageMap,
      hooks,

      afterBuild: () => {
        afterBuild();
        reload();
      },
    }),
  );
};
