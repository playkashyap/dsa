const express = require('express');
const BinaryTree = require('./script');
const BinarySearchTree = require('./binarySearchTree');

const app = express();
const port = 3000;

// Middleware to serve static files (if needed)
app.use(express.static('public'));

// Route to test BinaryTree
app.get('/binary-tree', (req, res) => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(40);
    tree.insert(50);

    const traversalResult = [];
    tree.inOrderTraversal(tree.root, (value) => traversalResult.push(value));

    res.json({
        message: 'Binary Tree Traversal',
        inOrder: traversalResult,
    });
});

// Route to test BinarySearchTree
app.get('/binary-search-tree', (req, res) => {
    const bst = new BinarySearchTree();
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);

    const traversalResult = [];
    bst.inOrderTraversal(bst.root, (value) => traversalResult.push(value));

    res.json({
        message: 'Binary Search Tree Traversal',
        inOrder: traversalResult,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
