class ContextMenu {
    constructor(jsPath, currentEvent, topPX, leftPX) {
        this.jsPath = jsPath;
        this.event = currentEvent;

        this.topPX = topPX;
        this.leftPX = leftPX;
    }

    async initialize() {
        this.cssString = await app.vault.adapter.read(this.jsPath + "/DataviewLibrary/styles/dark.css");

        this.cssElement = this.assignCSS();
        this.contextMenu = this.createContextMenu(this.topPX, this.leftPX);

        // Append the context menu to the document body
        document.body.appendChild(this.contextMenu);
    }

    assignCSS() {
        // Create a <style> element and set its textContent to the CSS string
        const styleElement = document.createElement('style');
        styleElement.textContent = this.cssString;
        document.head.appendChild(styleElement);

        return styleElement;
    }

    createContextMenu(topPX, leftPX) {
        // Create the context menu element
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.style.top = `${topPX}px`;
        contextMenu.style.left = `${leftPX}px`;

        // Add a click event listener to the document body to remove the context menu
        document.addEventListener('click', this.dispose);
        document.addEventListener('contextmenu', this.dispose);

        return contextMenu;
    }

    addToContextMenu(title, callback) {
        const newOption = document.createElement('div');
        newOption.innerText = title;
        newOption.className = 'context-menu-button';
        newOption.addEventListener('click', () => {callback(this.event)});

        this.contextMenu.appendChild(newOption);
    }

    addDividerToContextMenu() {
        const divider = document.createElement('div');
        divider.className = 'context-menu-divider';

        this.contextMenu.appendChild(divider);
    }

    dispose = () => {
        // Function to remove the context menu when clicking outside it
        document.removeEventListener('click', this.dispose);
        document.removeEventListener('contextmenu', this.dispose);

        // Check if this.contextMenu exists and is a child of the document's <body>
        if (this.contextMenu && this.contextMenu.parentNode === document.body) {
            document.body.removeChild(this.contextMenu);
        }

        // Check if this.cssElement exists and is a child of the document's <head>
        if (this.cssElement && this.cssElement.parentNode === document.head) {
            document.head.removeChild(this.cssElement);
        }
    }
}

module.exports = {
    ContextMenu
}
