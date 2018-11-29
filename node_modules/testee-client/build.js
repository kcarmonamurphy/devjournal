const path = require('path');
const stealTools = require('steal-tools');

stealTools.export({
  steal: {
    config: path.join(__dirname, 'package.json!npm')
  },
  outputs: {
    '+standalone': {
      dest: path.join(__dirname, 'dist', 'testee.js')
    },
    '+standalone min': {
      dest: path.join(__dirname, 'dist', 'testee.min.js'),
      minify: true
    }
  }
}).catch(e => console.log(e));
