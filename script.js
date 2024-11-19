function highlightText() {
    const searchTerm = document.querySelector(".search-container input").value.toLowerCase();
    const content = document.querySelector("main");

    // Clear previous highlights
    const highlightedElements = content.querySelectorAll(".highlight");
    highlightedElements.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
    });

    // If search term is empty, exit
    if (!searchTerm) return;

    // Function to search and highlight text nodes
    function highlightNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const nodeText = node.textContent;
            const matchIndex = nodeText.toLowerCase().indexOf(searchTerm);

            if (matchIndex !== -1) {
                const highlightedSpan = document.createElement("span");
                highlightedSpan.className = "highlight";
                highlightedSpan.textContent = nodeText.substring(matchIndex, matchIndex + searchTerm.length);

                const beforeText = document.createTextNode(nodeText.substring(0, matchIndex));
                const afterText = document.createTextNode(nodeText.substring(matchIndex + searchTerm.length));

                const parent = node.parentNode;
                parent.replaceChild(afterText, node);
                parent.insertBefore(highlightedSpan, afterText);
                parent.insertBefore(beforeText, highlightedSpan);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
            node.childNodes.forEach(highlightNode);
        }
    }

    highlightNode(content);
}

// Function to remove highlights
function removeHighlights() {
    const highlightedElements = document.querySelectorAll(".highlight");
    highlightedElements.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
    });
}

// Add event listeners to the search button and input
document.querySelector(".search-container button").addEventListener("click", highlightText);

document.querySelector(".search-container input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        highlightText();
    }
});

// Add event listener to remove highlights when clicking anywhere on the page
document.addEventListener("click", function(event) {
    // Ensure the click is not on the search container or input box
    if (!document.querySelector(".search-container").contains(event.target)) {
        removeHighlights();
    }
});
