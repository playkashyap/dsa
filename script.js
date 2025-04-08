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
    preOrderTraversal(node) {
        if (node === null) {
            return;
        }

        console.log(node.value);
        this.preOrderTraversal(node.left);
        this.preOrderTraversal(node.right);
    }

    // In-order Traversal (Left, Root, Right)
    inOrderTraversal(node) {
        if (node === null) {
            return;
        }

        this.inOrderTraversal(node.left);
        console.log(node.value);
        this.inOrderTraversal(node.right);
    }

    // Post-order Traversal (Left, Right, Root)
    postOrderTraversal(node) {
        if (node === null) {
            return;
        }

        this.postOrderTraversal(node.left);
        this.postOrderTraversal(node.right);
        console.log(node.value);
    }

    // Level-order Traversal (Breadth-First Traversal)
    levelOrderTraversal() {
        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            console.log(current.value);

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

    // Method to visualize the binary tree
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

    // Improved method to visualize the binary tree
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

    // Method to visualize the binary tree in a tree-like structure
    visualizeTree(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        // Print the current node
        console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);

        // Recur for the left and right children
        const childPrefix = prefix + (isLeft ? "│   " : "    ");
        if (node.left || node.right) {
            this.visualizeTree(node.left, childPrefix, true);
            this.visualizeTree(node.right, childPrefix, false);
        }
    }
}

// Export the BinaryTree class
module.exports = BinaryTree;
