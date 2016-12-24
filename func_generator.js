(function () {
    'use strict';

    var config = require('./config.json');

    var Node = function (operation, level, parent) {
        this.left = null;
        this.right = null;
        this.level = level;
        this.operation = operation;
    };

    Node.prototype.getEvalString = function () {
        if (this.operation === 'x' || typeof this.operation === 'number') {
            return '(' + this.operation + ')';
        }

        return '(' + this.left.getEvalString() + this.operation +
            this.right.getEvalString() + ')';
    };

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

        queue.push(first.root);
        result.push({
            first: first.root,
            second: second.root
        });

        while(queue.length) {
            element = queue.splice(0, 1)[0];

            if (element.operation === 'x' || typeof element.left.operation === 'number') {
                continue;
            }

            //TODO add result forming of first and second field

            queue.push(element.left);
            queue.push(element.right);
        }
    };

    var Func = function () {
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
    };

    Func.prototype.crossover = function (another) {
        var tmp;
        var swappableNodes = getSwappableNodes(this, another);
        var node = swappableNodes[Math.floor(Math.random() * swappableNodes.length)];

        tmp = node.first;
        node.first = node.second;
        node.second = tmp;
    };

    /* jshint -W054*/
    Func.prototype.evaluate = function (x) {
        var f = new Function ('x', 'return ' + this.root.getEvalString());

        return f(x);
    };
    /* jshint +W054 */

    exports.Func = Func;
})();
