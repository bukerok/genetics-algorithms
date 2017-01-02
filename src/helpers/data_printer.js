var fs = require('fs');
var path = require('path');
var data = require('../../data/data.json');

exports.printPopulationInfo = function (population, mark) {
    var i;
    var result;
    var bestResult = [];
    var worstResult = [];
    var best = population[0];
    var worst = population[population.length - 1];

    for (i = 0; i < data.length; i++) {
        bestResult.push({
            arg: data[i].arg,
            val: best.evaluate(data[i].arg)
        });
        worstResult.push({
            arg: data[i].arg,
            val: worst.evaluate(data[i].arg)
        });
    }

    result = {
        best: bestResult,
        worst: worstResult
    };

    fs.writeFile(path.join(process.cwd(), 'logs', 'data-' + mark + '.json'),
        JSON.stringify(result, null, '\t'), function (error) {
            if (error) {
                console.error('ERROR: unable to write results to file.', err);
            }
        });
};
