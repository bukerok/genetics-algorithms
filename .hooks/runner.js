(function () {
    'use strict';

    var prepare = require('./fs-prepare');
    var algo = require('../index');

    var completed = false;

    var execAlgorithm = function () {
        try {
            algo();
        } catch (error) {
            console.log(error.message);
            console.log('Algorithm FAILURE.');
            return;
        }

        completed = true;
    };

    while(!completed) {
        prepare();
        console.log('Start algorithm.');
        execAlgorithm();
    }

    console.log('Algorithm SUCCESS.');
})();
