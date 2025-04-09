document.addEventListener("DOMContentLoaded", () => {
  // Function to update the AVL Tree visualization
  async function updateAVLTreeVisualization() {
    try {
      const response = await fetch("/avl-tree/visualize");
      const data = await response.json();
      const visualizationElement = document.getElementById(
        "avlTreeVisualization"
      );
      if (visualizationElement) {
        if (data.visualization && Array.isArray(data.visualization)) {
          visualizationElement.textContent = data.visualization.join("\n");
        } else {
          visualizationElement.textContent =
            "Tree is empty or visualization failed.";
        }
      }
    } catch (error) {
      console.error("Error updating AVL tree visualization:", error);
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

  // Wait for the avlTree.html content to load
  const avlTreeContainer = document.getElementById("avlTreeContainer");
  const observer = new MutationObserver(() => {
    if (avlTreeContainer.querySelector("#addAVLTreeNode")) {
      // Add event listeners once the content is loaded
      addEventListenerSafely("addAVLTreeNode", "click", async () => {
        const inputElement = document.getElementById("avlTreeInput");
        if (inputElement) {
          const value = inputElement.value;
          if (value) {
            try {
              await fetch("/avl-tree/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ value: parseInt(value) }),
              });
              inputElement.value = "";
              updateAVLTreeVisualization(); // Update visualization
            } catch (error) {
              console.error("Error adding AVL tree node:", error);
            }
          }
        }
      });

      addEventListenerSafely("avlTreeInOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/avl-tree/traversal/in-order");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nIn-Order Traversal: ${JSON.stringify(
              data.traversal,
              null,
              2
            )}`;
          }
          updateAVLTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing in-order traversal:", error);
        }
      });

      addEventListenerSafely("avlTreePreOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/avl-tree/traversal/pre-order");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPre-Order Traversal: ${JSON.stringify(
              data.traversal,
              null,
              2
            )}`;
          }
          updateAVLTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing pre-order traversal:", error);
        }
      });

      addEventListenerSafely("avlTreePostOrderTraversal", "click", async () => {
        try {
          const response = await fetch("/avl-tree/traversal/post-order");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nPost-Order Traversal: ${JSON.stringify(
              data.traversal,
              null,
              2
            )}`;
          }
          updateAVLTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error performing post-order traversal:", error);
        }
      });

      addEventListenerSafely("avlTreeHeight", "click", async () => {
        try {
          const response = await fetch("/avl-tree/height");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nHeight: ${data.height}`;
          }
          updateAVLTreeVisualization(); // Update visualization
        } catch (error) {
          console.error("Error fetching AVL tree height:", error);
        }
      });

      addEventListenerSafely("avlTreeBalanceFactor", "click", async () => {
        try {
          const response = await fetch("/avl-tree/balance-factor");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nBalance Factor: ${JSON.stringify(
              data.balanceFactor,
              null,
              2
            )}`;
          }
        } catch (error) {
          console.error("Error fetching AVL tree balance factor:", error);
        }
      });

      addEventListenerSafely(
        "avlTreeLevelOrderTraversal",
        "click",
        async () => {
          try {
            const response = await fetch("/avl-tree/traversal/level-order");
            const data = await response.json();
            const outputElement = document.getElementById("avlTreeOutput");
            if (outputElement) {
              outputElement.textContent += `\nLevel-Order Traversal: ${JSON.stringify(
                data.traversal,
                null,
                2
              )}`;
            }
          } catch (error) {
            console.error("Error performing level-order traversal:", error);
          }
        }
      );

      addEventListenerSafely("avlTreeBalanceFactor", "click", async () => {
        try {
          const response = await fetch("/avl-tree/balance-factor");
          const data = await response.json();
          const outputElement = document.getElementById("avlTreeOutput");
          if (outputElement) {
            outputElement.textContent += `\nBalance Factor: ${JSON.stringify(
              data.balanceFactor,
              null,
              2
            )}`;
          }
        } catch (error) {
          console.error("Error fetching AVL tree balance factor:", error);
        }
      });

      // Stop observing once the content is loaded
      observer.disconnect();
    }
  });

  observer.observe(avlTreeContainer, { childList: true, subtree: true });

  // Initial visualization update
  updateAVLTreeVisualization();
});
