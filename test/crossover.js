// CROSSOVER

var Func = require('../src/func');

var f1 = new Func();
var f2 = new Func();

console.log('F1', f1.root.getEvalString());
console.log('F2', f2.root.getEvalString());
console.log('MU', f1.crossover(f2).root.getEvalString());
console.log('C1', f1.root.getEvalString());
console.log('C2', f2.root.getEvalString());
