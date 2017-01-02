/* jshint -W104 */
class Node {
    constructor(operation, level, parent) {
        this.left = null;
        this.right = null;
        this.level = level;
        this.operation = operation;
        this.parent = parent;
    }

    getEvalString() {
        if (this.operation === 'x' || typeof this.operation === 'number') {
            return '(' + this.operation + ')';
        }

        return '(' + this.left.getEvalString() + this.operation +
        this.right.getEvalString() + ')';
    }

    clone() {
        var clone = new Node(this.operation, this.level, this.parent);

        clone.left = this.left ? this.left.clone() : null;
        clone.right = this.right ? this.right.clone() : null;

        return clone;
    }
}
/* jshint +W104 */

module.exports = Node;
