const path = require('path');
const extracter = require('./extracter');

extracter({
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist/src')
});
