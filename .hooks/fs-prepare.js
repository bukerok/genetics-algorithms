(function () {
    var fs = require('fs');
    var path = require('path');
    var config = require('../configs/debug-config.json');
    var dataPath = path.join(process.cwd(), config.logsFolder);

    var i;
    var files;

    try {
        fs.mkdirSync(dataPath);
    } catch (error) {
        if (error.code !== 'EEXIST') {
            console.log('Unexpected error prepearing \'logs\' directory.', error);
        }
    }

    files = fs.readdirSync(dataPath);
    for (i = 0; i < files.length; i++) {
        fs.unlinkSync(path.join(dataPath, files[i]));
    }
})();
