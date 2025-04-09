document.addEventListener("DOMContentLoaded", () => {
  // Function to update the Binary Search Tree visualization
  async function updateBinarySearchTreeVisualization() {
    try {
      const response = await fetch("/binary-search-tree/visualize");
      const data = await response.json();
      const visualizationElement = document.getElementById("binarySearchTreeVisualization");
      if (visualizationElement) {
        if (data.visualization && Array.isArray(data.visualization)) {
          visualizationElement.textContent = data.visualization.join("\n");
        } else {
          visualizationElement.textContent = "Tree is empty or visualization failed.";
        }
      }
    } catch (error) {
      console.error("Error updating binary search tree visualization:", error);
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

  // Wait for the binarySearchTree.html content to load
  const binarySearchTreeContainer = document.getElementById("binarySearchTreeContainer");
  const observer = new MutationObserver(() => {
    if (binarySearchTreeContainer.querySelector("#addBinarySearchTreeNode")) {
      // Add event listeners once the content is loaded
      addEventListenerSafely("addBinarySearchTreeNode", "click", async () => {
        const inputElement = document.getElementById("binarySearchTreeInput");
        if (inputElement) {
          const value = inputElement.value;
          if (value) {
            try {
              await fetch("/binary-search-tree/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: parseInt(value) }),
              });
              inputElement.value = "";
              updateBinarySearchTreeVisualization(); // Update visualization
            } catch (error) {
              console.error("Error adding binary search tree node:", error);
            }
          }
        }
      });

      addEventListenerSafely("binarySearchTreeInOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/traversal/in-order");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nIn-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinarySearchTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing in-order traversal:", error);
        }
      });

      addEventListenerSafely("binarySearchTreePreOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/traversal/pre-order");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPre-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinarySearchTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing pre-order traversal:", error);
        }
      });

      addEventListenerSafely("binarySearchTreePostOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/traversal/post-order");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPost-Order Traversal: ${JSON.stringify(data.traversal, null, 2)}`;
          }
          updateBinarySearchTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing post-order traversal:", error);
        }
      });

      addEventListenerSafely("binarySearchTreeHeight", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/height");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nHeight: ${data.height}`;
          }
          updateBinarySearchTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error fetching binary search tree height:", error);
        }
      });

      addEventListenerSafely("binarySearchTreeSearch", "click", async () => {
        const inputElement = document.getElementById("binarySearchTreeSearchInput");
        if (inputElement) {
          const value = inputElement.value;
          if (value) {
            try {
              const response = await fetch(`/binary-search-tree/search?value=${value}`);
              const data = await response.json();
              const outputElement = document.getElementById("binarySearchTreeOutput");
              if (outputElement) {
                outputElement.textContent += `\nSearch Result: Found = ${data.found}`;
              }
              updateBinarySearchTreeVisualization(); // Update visualization
            } catch (error) {
              console.error("Error searching binary search tree:", error);
            }
          }
        }
      });

      addEventListenerSafely("binarySearchTreeMin", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/min");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nMin Value: ${data.min}`;
          }
        } catch (error) {
          console.error("Error fetching minimum value:", error);
        }
      });

      addEventListenerSafely("binarySearchTreeMax", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/max");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nMax Value: ${data.max}`;
          }
        } catch (error) {
          console.error("Error fetching maximum value:", error);
        }
      });

      addEventListenerSafely("binarySearchTreeLevelOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/binary-search-tree/traversal/level-order");
          const data = await response.json();
          const outputElement = document.getElementById("binarySearchTreeOutput");
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

  observer.observe(binarySearchTreeContainer, { childList: true, subtree: true });

  // Initial visualization update
  updateBinarySearchTreeVisualization();
});
