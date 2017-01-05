var fs = require('fs');
var path = require('path');
var data = require('../../data/data.json').best.data;

exports.printPopulationInfo = function (population, mark) {
    var i;
    var result;
    var bestResult = [];
    var worstResult = [];
    var best = population[0];
    var worst = population[population.length - 1];

    for (i = 0; i < data.length; i++) {
        bestResult.push({
            x: data[i].x,
            y: best.evaluate(data[i].x)
        });
        worstResult.push({
            x: data[i].x,
            y: worst.evaluate(data[i].x)
        });
    }

    result = {
        best: {
            expression: best.root.getEvalString(),
            data: bestResult
        },
        worst: {
            expression: worst.root.getEvalString(),
            data: worstResult
        }
    };

    try {
        fs.writeFileSync(path.join(process.cwd(), 'logs', 'data-' + mark + '.json'),
            JSON.stringify(result, null, '\t'));
    } catch (error) {
        console.error('Error: unable to write results to file.', error.message);
        console.error('Error: visualisation data damaged.');
    }
};
