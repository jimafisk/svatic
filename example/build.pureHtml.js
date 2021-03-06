const {build} = require('..');

const path = require('path');

const pageMap = [
  {src: 'Index.svelte', dest: 'index.html'},
  {src: 'About.svelte', dest: 'about.html'},
];

const srcDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'out/pureHtml');

const main = () =>
  build({
    srcDir,
    destDir,
    pageMap,
  });

if (require.main === module) {
  main();
} else {
  module.exports = {build: main, pageMap, srcDir, destDir};
}
