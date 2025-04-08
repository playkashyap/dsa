const express = require('express');
const BinaryTree = require('./script');
const BinarySearchTree = require('./binarySearchTree');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to serve static files
app.use(express.static('public'));

// Initialize trees
const binaryTree = new BinaryTree();
const binarySearchTree = new BinarySearchTree();

// Routes for Binary Tree
app.post('/binary-tree/add', (req, res) => {
    const { value } = req.body;
    binaryTree.insert(value);
    res.json({ message: `Node ${value} added to Binary Tree` });
});

app.get('/binary-tree/visualize', (req, res) => {
    const visualization = [];
    binaryTree.visualizeTree(binaryTree.root, '', true, visualization);
    res.json({ visualization });
});

app.get('/binary-tree/height', (req, res) => {
    const height = binaryTree.findHeight(binaryTree.root);
    res.json({ height });
});

app.get('/binary-tree/traversal', (req, res) => {
    const traversalResult = [];
    binaryTree.inOrderTraversal(binaryTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

// Routes for Binary Tree Traversals
app.get('/binary-tree/traversal/in-order', (req, res) => {
    const traversalResult = [];
    binaryTree.inOrderTraversal(binaryTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

app.get('/binary-tree/traversal/pre-order', (req, res) => {
    const traversalResult = [];
    binaryTree.preOrderTraversal(binaryTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

app.get('/binary-tree/traversal/post-order', (req, res) => {
    const traversalResult = [];
    binaryTree.postOrderTraversal(binaryTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

// Level-order Traversal for Binary Tree
app.get('/binary-tree/traversal/level-order', (req, res) => {
    const traversalResult = [];
    binaryTree.levelOrderTraversal((value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

// Routes for Binary Search Tree
app.post('/binary-search-tree/add', (req, res) => {
    const { value } = req.body;
    binarySearchTree.insert(value);
    res.json({ message: `Node ${value} added to Binary Search Tree` });
});

app.get('/binary-search-tree/visualize', (req, res) => {
    const visualization = [];
    binarySearchTree.visualizeTree(binarySearchTree.root, '', true, visualization);
    res.json({ visualization });
});

app.get('/binary-search-tree/traversal', (req, res) => {
    const traversalResult = [];
    binarySearchTree.inOrderTraversal(binarySearchTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

app.get('/binary-search-tree/height', (req, res) => {
    const height = binarySearchTree.findHeight(binarySearchTree.root);
    res.json({ height });
});

app.get('/binary-search-tree/search', (req, res) => {
    const { value } = req.query;
    const found = binarySearchTree.search(parseInt(value));
    res.json({ found });
});

// Route to find the minimum value in the BST
app.get('/binary-search-tree/min', (req, res) => {
    const minValue = binarySearchTree.findMin();
    res.json({ min: minValue });
});

// Route to find the maximum value in the BST
app.get('/binary-search-tree/max', (req, res) => {
    const maxValue = binarySearchTree.findMax();
    res.json({ max: maxValue });
});

// Routes for Binary Search Tree Traversals
app.get('/binary-search-tree/traversal/in-order', (req, res) => {
    const traversalResult = [];
    binarySearchTree.inOrderTraversal(binarySearchTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

app.get('/binary-search-tree/traversal/pre-order', (req, res) => {
    const traversalResult = [];
    binarySearchTree.preOrderTraversal(binarySearchTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

app.get('/binary-search-tree/traversal/post-order', (req, res) => {
    const traversalResult = [];
    binarySearchTree.postOrderTraversal(binarySearchTree.root, (value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

// Level-order Traversal for Binary Search Tree
app.get('/binary-search-tree/traversal/level-order', (req, res) => {
    const traversalResult = [];
    binarySearchTree.levelOrderTraversal((value) => traversalResult.push(value));
    res.json({ traversal: traversalResult });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
