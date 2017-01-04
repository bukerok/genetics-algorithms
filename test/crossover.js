// CROSSOVER

var Func = require('../src/func');

var f1 = new Func();
var f2 = new Func();
var mutants, i;

console.log('F1', f1.root.getEvalString());
console.log('F2', f2.root.getEvalString());
mutants = f1.crossover(f2);
for (i = 0; i < mutants.length; i++) {
    console.log('M' + i, mutants[i].root.getEvalString());
}
console.log('C1', f1.root.getEvalString());
console.log('C2', f2.root.getEvalString());
