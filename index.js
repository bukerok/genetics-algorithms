var config = require('./config.json');
var data = require('./data.json');
var Func = require('./func_generator').Func;

var i, j;
var population = [];
var parents = [];
var pairs = [];

var printResult = function (f) {
    //TODO output values to the file
    var j;
    var diff = 0;

    for (j = 0; j < data.length; j++) {
        diff += Math.abs(f.evaluate(data[j].arg) - data[j].val);
    }

    console.log('DIFF', diff);
};

var funcComparator = function (a, b) {
    var j;
    var diffA = 0;
    var diffB = 0;

    for (j = 0; j < data.length; j++) {
        diffA += Math.abs(a.evaluate(data[j].arg) - data[j].val);
        diffB += Math.abs(b.evaluate(data[j].arg) - data[j].val);
    }

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
        metr += Math.abs(func.evaluate(data[j].arg) - data[j].val);
    }

    return metr;
};

var getSelection = function (arr) {
    var j, k;
    var funcMetric;
    var randInd, indSum;
    var sumNorm = 0;
    var finiteFunctions = [];
    var selection = [];

    for (j = 0; j < arr.length; j++) {
        funcMetric = getFuncMetric(arr[j]);

        if (!Number.isFinite(funcMetric)) {
            console.error('UNEXPECTED BEHAVIOR: PROVIDED FUNCTION DISCONTINUOUS.');
            process.exit(1);
        }

        sumNorm += funcMetric;
        finiteFunctions.push({
            func: arr[j],
            norm: funcMetric
        });
    }

    for (j = 0; j < finiteFunctions.length; j++) {
        finiteFunctions[j].norm = finiteFunctions[j].norm / sumNorm;
    }

    for (j = 0; j < Math.floor(config.populationSize / 2); j++) {
        randInd = Math.random();
        indSum = 0;

        for (k = 0; k < finiteFunctions.length; k++) {
            if (randInd < finiteFunctions[k].norm) {
                // console.log('SELECT', k);
                break;
            }
            indSum += finiteFunctions[k].norm;
        }
    }

    return selection;
};

var shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// creating initial population
for (i = 0; i < config.populationSize; i++) {
    population.push(new Func());
}

for (i = 0; i < Math.floor(config.populationSize / 2); i++) {
    pairs.push(i);
}


for (i = 0; i < 10; i++) {//config.iterations; i++) {
    parents = [];

    //sorting
    population.sort(funcComparator);

    if (i % 10 === 0) {
        //print data about best function to file
        printResult(population[0]);
        //print data about worst function to file
        printResult(population[population.length - 1]);
    }
    // selection
    parents = getSelection(population);
    // parents pairs formation
    pairs = shuffle(pairs);
    // crossover
    population = [];
    for (j = 0; j < pairs.length; j++) {
        population.push(parents[j].crossover(parents[pairs[j]]));
    }
    // mutation
}

population.sort(funcComparator);
printResult(population[0]);
printResult(population[population.length - 1])
