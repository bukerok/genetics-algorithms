var config = require('../configs/algorithm-config.json');
var Node = require('./node');

var getConstValue = function () {
    return (Math.random() > 0.5 ? 1 : -1) * (Math.random() * config.amplitude);
};

var getRandomOperation = function (operations) {
    var operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === 'const') {
        return getConstValue();
    }

    return operation;
};

var getSwappableNodes = function (first, second) {
    var element;
    var queue = [];
    var result = [];

    queue.push({
        first: first.root,
        second: second.root
    });
    result.push({
        first: first.root,
        second: second.root
    });

    while(queue.length) {
        element = queue.splice(0, 1)[0];

        result.push(element);

        if (element.first.operation === 'x' || typeof element.first.operation === 'number' ||
            element.second.operation === 'x' || typeof element.second.operation === 'number') {
            continue;
        }

        queue.push({
            first: element.first.left,
            second: element.second.left
        });
        queue.push({
            first: element.first.right,
            second: element.second.right
        });
    }

    return result;
};

/* jshint -W104 */
class Func {
    constructor() {
        var element, left, right;
        var CLOSE_NODE_OPERATIONS = ['x', 'const'];
        var OPEN_NODE_OPERATIONS = config.operations.concat(CLOSE_NODE_OPERATIONS);
        var depth = config.depth;
        var queue = [];

        this.root = new Node(getRandomOperation(config.operations), 0, null);
        queue.push(this.root);

        while(queue.length) {
            element = queue.splice(0, 1)[0];

            // stop generation if node contain variable or constant
            if (element.operation === 'x' || typeof element.operation === 'number') {
                continue;
            }

            // if max depth riched select from 'x' or 'const', otherwise all operations
            if (element.level >= depth) {
                left = new Node(getRandomOperation(CLOSE_NODE_OPERATIONS), element.level + 1, element);
                right = new Node(getRandomOperation(CLOSE_NODE_OPERATIONS), element.level + 1, element);
            } else {
                left = new Node(getRandomOperation(OPEN_NODE_OPERATIONS), element.level + 1, element);
                right = new Node(getRandomOperation(OPEN_NODE_OPERATIONS), element.level + 1, element);
                queue.push(left);
                queue.push(right);
            }

            element.left = left;
            element.right = right;
        }
    }

    clone() {
        // very inefficient
        var result = new Func();

        result.root = this.root.clone();

        return result;
    }

    crossover(another) {
        var result = this.clone();
        var swappableNodes = getSwappableNodes(result, another);
        var node = swappableNodes[Math.floor(Math.random() * swappableNodes.length)];

        node.first.parent = node.second.parent ? node.second.parent.clone() : null;
        node.first.left = node.second.left ? node.second.left.clone() : null;
        node.first.right = node.second.right ? node.second.right.clone() : null;
        node.first.operation = node.second.operation;

        return result;
    }

    evaluate(x) {
        /* jshint -W054 */
        var f = new Function ('x', 'return ' + this.root.getEvalString());
        /* jshint +W054 */

        return f(x);
    }

    mutate() {
        var rand;
        var element;
        var queue = [];

        queue.push(this.root);

        while(queue.length) {
            element = queue.splice(0, 1)[0];
            rand = Math.random();

            if(element.left) {
                queue.push(element.left);
            }
            if(element.right) {
                queue.push(element.right);
            }

            if (rand > config.mutationThreshold) {
                continue;
            }

            if (config.operations.indexOf(element.operation) === -1) {
                element.operation = getRandomOperation(['x', 'const']);
            } else {
                element.operation = getRandomOperation(config.operations);
            }
        }
    }
}
/* jshint +W104 */

module.exports = Func;
