class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  // Get the height of the node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Get the balance factor of the node
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Calculate the balance factor of the root node
  calculateBalanceFactor(node) {
    if (!node) return null;
    return this.getBalance(node);
  }

  // Right rotate
  rightRotate(z) {
    const y = z.left;
    const T3 = y.right;

    // Perform rotation
    y.right = z;
    z.left = T3;

    // Update heights
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    return y;
  }

  // Left rotate
  leftRotate(z) {
    const y = z.right;
    const T2 = y.left;

    // Perform rotation
    y.left = z;
    z.right = T2;

    // Update heights
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    return y;
  }

  // Insert a node
  insert(root, key) {
    if (!root) return new Node(key);

    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    } else {
      return root; // Duplicate keys are not allowed
    }

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    const balance = this.getBalance(root);

    if (balance > 1 && key < root.left.key) return this.rightRotate(root);
    if (balance < -1 && key > root.right.key) return this.leftRotate(root);
    if (balance > 1 && key > root.left.key) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && key < root.right.key) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }

  // Find the node with the smallest value
  getMinValueNode(root) {
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // Delete a node
  delete(root, key) {
    if (!root) return root;

    if (key < root.key) {
      root.left = this.delete(root.left, key);
    } else if (key > root.key) {
      root.right = this.delete(root.right, key);
    } else {
      if (!root.left || !root.right) {
        root = root.left || root.right;
      } else {
        const temp = this.getMinValueNode(root.right);
        root.key = temp.key;
        root.right = this.delete(root.right, temp.key);
      }
    }

    if (!root) return root;

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    const balance = this.getBalance(root);

    if (balance > 1 && this.getBalance(root.left) >= 0) return this.rightRotate(root);
    if (balance > 1 && this.getBalance(root.left) < 0) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && this.getBalance(root.right) <= 0) return this.leftRotate(root);
    if (balance < -1 && this.getBalance(root.right) > 0) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }

  // In-order traversal (returns an array of values)
  inOrder(node, callback = console.log) {
    const result = [];
    const traverse = (node) => {
      if (node) {
        traverse(node.left);
        result.push(node.key);
        traverse(node.right);
      }
    };
    traverse(node);
    result.forEach(callback);
    return result;
  }

  // Pre-order traversal (returns an array of values)
  preOrder(node, callback = console.log) {
    const result = [];
    const traverse = (node) => {
      if (node) {
        result.push(node.key);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(node);
    result.forEach(callback);
    return result;
  }

  // Post-order traversal (returns an array of values)
  postOrder(node, callback = console.log) {
    const result = [];
    const traverse = (node) => {
      if (node) {
        traverse(node.left);
        traverse(node.right);
        result.push(node.key);
      }
    };
    traverse(node);
    result.forEach(callback);
    return result;
  }

  // Level-order traversal (Breadth-First Traversal)
  levelOrder(node, callback = console.log) {
    if (!node) return [];

    const queue = [node];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.key);
      callback(current.key);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  // Visualize the AVL tree in a tree-like structure
  visualizeTree(node, prefix = '', isLeft = true, result = []) {
    if (node === null) {
      return;
    }

    result.push(prefix + (isLeft ? '├── ' : '└── ') + node.key);

    const childPrefix = prefix + (isLeft ? '│   ' : '    ');
    this.visualizeTree(node.left, childPrefix, true, result);
    this.visualizeTree(node.right, childPrefix, false, result);

    return result;
  }

  // Find the minimum value in the AVL tree
  findMin(node) {
    if (!node) return null;
    while (node.left) {
      node = node.left;
    }
    return node.key;
  }

  // Find the maximum value in the AVL tree
  findMax(node) {
    if (!node) return null;
    while (node.right) {
      node = node.right;
    }
    return node.key;
  }

  // Find the height of the AVL tree
  findHeight(node) {
    if (!node) return -1; // Return -1 for null to account for edges
    const leftHeight = this.findHeight(node.left);
    const rightHeight = this.findHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Search for a value in the AVL tree
  search(node, key) {
    if (!node) return false;
    if (key === node.key) return true;
    if (key < node.key) return this.search(node.left, key);
    return this.search(node.right, key);
  }
}

// Export the AVLTree class
module.exports = AVLTree;
