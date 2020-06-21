var path = require('path');
var fs = require('fs');

const mkdirsSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        fs.mkdirSync(dirname);
        return true;
    }
};
module.exports = { mkdirsSync };
