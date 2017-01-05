module.exports = function () {
    var algorithmConfig = require('./configs/algorithm-config.json');
    var debugConfig = require('./configs/debug-config.json');
    var data = require('./data/data.json').best.data;
    var Func = require('./src/func');
    var getShuffle = require('./src/helpers/shuffler').getShuffle;
    var print = require('./src/helpers/data_printer').printPopulationInfo;

    var i, j;
    var population = [];
    var parents = [];
    var pairs = [];

    var funcComparator = function (a, b) {
        var diffA = getFuncMetric(a);
        var diffB = getFuncMetric(b);

        if (!Number.isFinite(diffA - diffB)) {
            return !Number.isFinite(diffA) ? 1 : -1;
        } else {
            return diffA - diffB;
        }
    };

    var getFuncMetric = function (func) {
        var j;
        var metr = 0;

        for (j = 0; j < data.length; j++) {
            metr += Math.abs(func.evaluate(data[j].x) - data[j].y);
        }

        return metr;
    };

    var getSelection = function (arr) {
        var j, tmp;
        var funcMetric;
        var randInd;
        var sumNorm = 0;
        var finiteFunctions = [];
        var selection = [];

        for (j = 0; j < arr.length; j++) {
            funcMetric = getFuncMetric(arr[j]);

            if (!Number.isFinite(funcMetric)) {
                throw new Error('Unexpected behavior: discontinuous function.');
            }

            sumNorm += funcMetric;
            finiteFunctions.push({
                func: arr[j],
                norm: funcMetric
            });
        }

        // normalizing selection probability
        // calculating functions deviations
        for (j = 0; j < finiteFunctions.length; j++) {
            finiteFunctions[j].norm = finiteFunctions[j].norm / sumNorm;
        }
        // swap deviations
        for (j = 0; j < Math.floor(finiteFunctions.length / 2); j++) {
            tmp = finiteFunctions[j].norm;
            finiteFunctions[j].norm = finiteFunctions[finiteFunctions.length - j - 1].norm;
            finiteFunctions[finiteFunctions.length - j - 1].norm = tmp;
        }
        // format resulting sequence
        for (j = 1; j < finiteFunctions.length; j++) {
            finiteFunctions[j].norm += finiteFunctions[j - 1].norm;
        }

        while (selection.length < Math.floor(algorithmConfig.populationSize / 2)) {
            randInd = Math.random();

            for (k = 0; k < finiteFunctions.length; k++) {
                if (randInd < finiteFunctions[k].norm && selection.indexOf(finiteFunctions[k]) === -1) {
                    selection.push(finiteFunctions[k]);
                    break;
                }
            }
        }

        return selection.map(function (el) {
            return el.func;
        });
    };

    // creating initial population
    for (i = 0; i < algorithmConfig.populationSize; i++) {
        population.push(new Func());
    }

    for (i = 0; i < Math.floor(algorithmConfig.populationSize / 2); i++) {
        pairs.push(i);
    }

    for (i = 0; i < algorithmConfig.iterations; i++) {
        //sorting
        population.sort(funcComparator);

        if (i % debugConfig.checkPoint === 0) {
            print(population, i / debugConfig.checkPoint);
        }
        // selection
        parents = getSelection(population);
        // parents pairs formation
        pairs = getShuffle(pairs);
        // crossover
        population = [];
        for (j = 0; j < pairs.length; j++) {
            population = population.concat(parents[j].crossover(parents[pairs[j]]));
        }
        // mutation
        for (j = 0; j < population.length; j++) {
            population[j].mutate();
        }
    }

    population.sort(funcComparator);
    print(population, 'final');
};
