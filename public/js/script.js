class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insert a node in the tree
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // Pre-order Traversal (Root, Left, Right)
    preOrderTraversal(node, callback = console.log) {
        if (node === null) {
            return;
        }

        callback(node.value); // Process the root node
        this.preOrderTraversal(node.left, callback); // Recur on the left subtree
        this.preOrderTraversal(node.right, callback); // Recur on the right subtree
    }

    // In-order Traversal (Left, Root, Right)
    inOrderTraversal(node, callback = console.log) {
        if (node === null) {
            return;
        }
        this.inOrderTraversal(node.left, callback);
        callback(node.value);
        this.inOrderTraversal(node.right, callback);
    }

    // Post-order Traversal (Left, Right, Root)
    postOrderTraversal(node, callback = console.log) {
        if (node === null) {
            return;
        }

        this.postOrderTraversal(node.left, callback); // Recur on the left subtree
        this.postOrderTraversal(node.right, callback); // Recur on the right subtree
        callback(node.value); // Process the root node
    }

    // Level-order Traversal (Breadth-First Traversal)
    levelOrderTraversal(callback = console.log) {
        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current.value); // Process the current node

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }
    }

    // Method to find the height of the binary tree
    findHeight(node) {
        if (node === null) {
            return -1; // Return -1 for null to account for edges
        }

        const leftHeight = this.findHeight(node.left);
        const rightHeight = this.findHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    visualizeTree(node, prefix = '', isLeft = true, result = []) {
        if (node === null) {
            return;
        }

        result.push(prefix + (isLeft ? '├── ' : '└── ') + node.value);

        const childPrefix = prefix + (isLeft ? '│   ' : '    ');
        this.visualizeTree(node.left, childPrefix, true, result);
        this.visualizeTree(node.right, childPrefix, false, result);
    }
}

// Export the BinaryTree class
module.exports = BinaryTree;
