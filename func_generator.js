(function () {
    'use strict';

    var config = require('./config.json');

    var Node = function (operation, level, parent) {
        this.left = null;
        this.right = null;
        this.level = level;
        this.operation = operation;
        this.parent = parent;
    };

    Node.prototype.getEvalString = function () {
        if (this.operation === 'x' || typeof this.operation === 'number') {
            return '(' + this.operation + ')';
        }

        return '(' + this.left.getEvalString() + this.operation +
            this.right.getEvalString() + ')';
    };

    Node.prototype.clone = function () {
        var clone = new Node(this.operation, this.level, this.parent);

        clone.left = this.left ? this.left.clone() : null;
        clone.right = this.right ? this.right.clone() : null;

        return clone;
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
        var result = this.clone();
        var swappableNodes = getSwappableNodes(result, another);
        var node = swappableNodes[Math.floor(Math.random() * swappableNodes.length)];

        node.first.parent = node.second.parent ? node.second.parent.clone() : null;
        node.first.left = node.second.left ? node.second.left.clone() : null;
        node.first.right = node.second.right ? node.second.right.clone() : null;
        node.first.operation = node.second.operation;

        return result;
    };

    Func.prototype.clone = function () {
        // very inefficient
        var result = new Func();

        result.root = this.root.clone();

        return result;
    };

    /* jshint -W054*/
    Func.prototype.evaluate = function (x) {
        var f = new Function ('x', 'return ' + this.root.getEvalString());

        return f(x);
    };
    /* jshint +W054 */

    exports.Func = Func;
})();
