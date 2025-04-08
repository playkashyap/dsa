class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert a value into the BST
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                // Duplicate values are not allowed
                return;
            }
        }
    }

    // Search for a value in the BST
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
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

    // Pre-order Traversal (Root, Left, Right)
    preOrderTraversal(node, callback = console.log) {
        if (node === null) {
            return;
        }
        callback(node.value);
        this.preOrderTraversal(node.left, callback);
        this.preOrderTraversal(node.right, callback);
    }

    // Post-order Traversal (Left, Right, Root)
    postOrderTraversal(node, callback = console.log) {
        if (node === null) {
            return;
        }
        this.postOrderTraversal(node.left, callback);
        this.postOrderTraversal(node.right, callback);
        callback(node.value);
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

    // Find the minimum value in the BST
    findMin(node = this.root) {
        if (node === null) {
            return null;
        }
        while (node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    // Find the maximum value in the BST
    findMax(node = this.root) {
        if (node === null) {
            return null;
        }
        while (node.right !== null) {
            node = node.right;
        }
        return node.value;
    }

    // Delete a value from the BST
    delete(value, node = this.root) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.delete(value, node.left);
        } else if (value > node.value) {
            node.right = this.delete(value, node.right);
        } else {
            // Node with only one child or no child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            // Node with two children: Get the inorder successor
            node.value = this.findMin(node.right);
            node.right = this.delete(node.value, node.right);
        }
        return node;
    }

    // Method to find the height of the binary search tree
    findHeight(node) {
        if (node === null) {
            return -1; // Return -1 for null to account for edges
        }

        const leftHeight = this.findHeight(node.left);
        const rightHeight = this.findHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Method to visualize the binary search tree
    visualize(node, space = 0, levelSpace = 5) {
        if (node === null) {
            return;
        }

        // Increase distance between levels
        space += levelSpace;

        // Process right child first
        this.visualize(node.right, space);

        // Print current node after space count
        console.log(" ".repeat(space - levelSpace) + node.value);

        // Process left child
        this.visualize(node.left, space);
    }

    // Improved method to visualize the binary search tree
    visualizeBetter() {
        if (this.root === null) {
            console.log("The tree is empty.");
            return;
        }

        const levels = [];
        const queue = [{ node: this.root, level: 0 }];

        while (queue.length > 0) {
            const { node, level } = queue.shift();

            if (!levels[level]) {
                levels[level] = [];
            }

            levels[level].push(node ? node.value : " ");

            if (node) {
                queue.push({ node: node.left, level: level + 1 });
                queue.push({ node: node.right, level: level + 1 });
            }
        }

        // Print the tree level by level
        const maxWidth = Math.pow(2, levels.length - 1) * 4; // Adjust spacing
        levels.forEach((level, i) => {
            const space = Math.floor(maxWidth / Math.pow(2, i + 1));
            console.log(
                level
                    .map((value) => (value === " " ? " ".repeat(3) : value.toString().padStart(3, " ")))
                    .join(" ".repeat(space))
            );
        });
    }

    // Method to visualize the binary search tree in a tree-like structure
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

// Export the BinarySearchTree class
module.exports = BinarySearchTree;