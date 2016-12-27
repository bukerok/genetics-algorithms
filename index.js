var config = require('./config.json');
var data = require('./data.json');
var Func = require('./func_generator').Func;

var i;
var population = [];
var parents = [];

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

var getSelectionDataStructure = function (arr) {

};

// creating initial population
for (i = 0; i < config.populationSize; i++) {
    population.push(new Func());
}


for (i = 0; i < config.iterations; i++) {
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
    // parents pairs formation
    // crossover
    // mutation
}
