const Node = require('./Node');

class Tree {
    constructor(arr) {
        this.root = this.buildTree(this.prepareArray(arr));
    }

    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = parseInt(arr.length / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1, arr.length));

        return root;
    }

    insert(value) {
        let newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let prev = null;
        let current = this.root;

        while (current) {
            if (current.data === value) {
                return;
            }

            if (current.data > value) {
                prev = current;
                current = current.left;
            } else {
                prev = current;
                current = current.right;
            }
        }

        if (prev.data > value) {
            prev.left = newNode;
        } else {
            prev.right = newNode;
        }
    }

    deleteNode(value) {
        let prev = null;
        let current = this.root;

        while (current && current.data !== value) {
            prev = current;
            if (current.data > value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!current) {
            console.log('Not Found');
            return;
        }

        // If Node is a leaf node
        if (!current.left && !current.right) {
            if (current.data > prev.data) {
                prev.right = null;
            } else {
                prev.left = null;
            }
            current = null;
        }

        // If Node has one child
        if (current.left === null && current.right !== null || current.left !== null && current.right === null) {
            if (value > prev.data) {
                // Prev's right
                if (current.left) {
                    prev.right = current.left;
                    current = null;
                    return;
                }
                if (current.right) {
                    prev.right = current.right;
                    current = null;
                    return;
                }
            } else {
                // Prevs's left
                if (current.left) {
                    prev.left = current.left;
                    current = null;
                    return;
                }
                if (current.right) {
                    prev.left = current.right;
                    current = null;
                    return;
                }
            }            
        }

        // If Node has 2 children
        if (current.left && current.right) {
            let parent = null;
            let newCurrent = current.right;

            while (newCurrent.left) {
                parent = newCurrent;
                newCurrent = newCurrent.left;
            }

            if (parent) {
                parent.left = newCurrent.right;
            } else {
                current.right = newCurrent.right;
            }

            current.data = newCurrent.data;
            newCurrent = null;
        }
    }

    find(value) {
        let current = this.root;

        while (current) {
            if (current.data === value) {
                return current;
            } else if (current.data > value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!current) return null;
    }

    levelOrder(cb = undefined) {
        let q = [];
        let result = [];
        let current = this.root;

        q.push(current);

        while (q.length > 0) {
            let temp = q.shift();

            if (cb) {
                result.push(cb(temp.data));
            } else {
                result.push(temp.data);
            }

            if (temp.left) {
                q.push(temp.left);
            }

            if (temp.right) {
                q.push(temp.right);
            }
        }

        return result;
    }

    // Left - Root - Right
    inorder(cb = undefined, root = this.root, result = []) {
        if (!root) return [];

        // Left Subtree
        if (root.left) this.inorder(cb, root.left, result);

        // Root
        result.push(root.data);
        
        // Right Subtree
        if (root.right) this.inorder(cb, root.right, result);

        return result;
    }

    // Root - Left - Right
    preorder(cb = undefined, root = this.root, result = []) {
        if (!root) return [];

        // Root
        result.push(root.data);

        // Left Subtree
        if (root.left) this.preorder(cb, root.left, result);

        // Right Subtree
        if (root.right) this.preorder(cb, root.right, result);

        return result;
    }

    // Left - Right - Root
    postorder(cb = undefined, root = this.root, result = []) {
        if (!root) return [];

        // Left Subtree
        if (root.left) this.postorder(cb, root.left, result);
        
        // Right Subtree
        if (root.right) this.postorder(cb, root.right, result);

        // Root
        result.push(root.data);

        return result;
    }

    height(node = this.root) {
        if (!node) return -1;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node || node === this.root) return 0;

        let depth = 0;
        let current = this.root;

        while (current.data !== node.data) {
            depth++;
            if (current.data > node.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return depth;
    }

    isBalanced(root = this.root) {
        const left = this.height(root.left);
        const right = this.height(root.right);
        const diff = Math.abs(left - right);

        if (diff < 2) return true;
        else return false;
    }

    rebalance() {
        this.root = this.buildTree(this.inorder());
    }

    prepareArray(arr) {
        return Array.from(new Set(arr)).sort((a, b) => a - b);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

module.exports = Tree;
