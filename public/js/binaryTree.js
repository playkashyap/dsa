document.addEventListener("DOMContentLoaded", () => {
  // Function to update the Binary Tree visualization
  async function updateBinaryTreeVisualization() {
    try {
      const response = await fetch("/binary-tree/visualize");
      const data = await response.json();
      const visualizationElement = document.getElementById("binaryTreeVisualization");
      if (visualizationElement) {
        if (data.visualization && Array.isArray(data.visualization)) {
          visualizationElement.textContent = data.visualization.join("\n");
        } else {
          visualizationElement.textContent = "Tree is empty or visualization failed.";
        }
      }
    } catch (error) {
      console.error("Error updating binary tree visualization:", error);
    }
  }

  // Helper function to safely add event listeners
  function addEventListenerSafely(elementId, event, handler) {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener(event, handler);
    } else {
      console.warn(`Element with ID "${elementId}" not found.`);
    }
  }

  // Wait for the binaryTree.html content to load
  const binaryTreeContainer = document.getElementById("binaryTreeContainer");
  const observer = new MutationObserver(() => {
    if (binaryTreeContainer.querySelector("#addBinaryTreeNode")) {
      // Add event listeners once the content is loaded
      addEventListenerSafely("addBinaryTreeNode", "click", async () => {
        const inputElement = document.getElementById("binaryTreeInput");
        if (inputElement) {
          const value = inputElement.value;
          if (value) {
            try {
              await fetch("/binary-tree/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: parseInt(value) }),
              });
              inputElement.value = "";
              updateBinaryTreeVisualization(); // Update visualization
            } catch (error) {
              console.error("Error adding binary tree node:", error);
            }
          }
        }
      });

      addEventListenerSafely("binaryTreeInOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-tree/traversal/in-order");
          const data = await response.json();
          const outputElement = document.getElementById("binaryTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nIn-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinaryTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing in-order traversal:", error);
        }
      });

      addEventListenerSafely("binaryTreePreOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-tree/traversal/pre-order");
          const data = await response.json();
          const outputElement = document.getElementById("binaryTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPre-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinaryTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing pre-order traversal:", error);
        }
      });

      addEventListenerSafely("binaryTreePostOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-tree/traversal/post-order");
          const data = await response.json();
          const outputElement = document.getElementById("binaryTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPost-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinaryTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing post-order traversal:", error);
        }
      });

      addEventListenerSafely("binaryTreeHeight", "click", async () => {
        try {
          const response = await fetch("/binary-tree/height");
          const data = await response.json();
          const outputElement = document.getElementById("binaryTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nHeight: ${data.height}`;
          }
          updateBinaryTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error fetching binary tree height:", error);
        }
      });

      addEventListenerSafely("binaryTreeLevelOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-tree/traversal/level-order");
          const data = await response.json();
          const outputElement = document.getElementById("binaryTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nLevel-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
        } catch (error) {
          console.error("Error performing level-order traversal:", error);
        }
      });

      // Stop observing once the content is loaded
      observer.disconnect();
    }
  });

  observer.observe(binaryTreeContainer, { childList: true, subtree: true });

  // Initial visualization update
  updateBinaryTreeVisualization();
});
