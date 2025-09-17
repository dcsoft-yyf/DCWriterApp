/**
 * Main application entry point
 * Initializes DCWriter5 and sets up the complete editor environment
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    const app = new DCWriter5App();
});

class DCWriter5App {
    constructor() {
        this.editorElement = document.getElementById('dcwriter-editor');
        this.dcwriter = null;
        this.rtfHandler = null;
        this.toolbar = null;
        
        this.init();
    }
    
    init() {
        try {
            // Initialize core components
            this.rtfHandler = new RTFHandler();
            this.dcwriter = new DCWriter5Core(this.editorElement);
            this.toolbar = new ToolbarManager(this.dcwriter, this.rtfHandler);
            
            // Set up additional event listeners
            this.setupGlobalEvents();
            
            // Initialize editor focus
            this.editorElement.focus();
            
            console.log('DCWriter5 initialized successfully');
            
            // Show welcome notification
            setTimeout(() => {
                this.toolbar.showNotification('DCWriter5 is ready! Start typing to create your document.');
            }, 1000);
            
        } catch (error) {
            console.error('Error initializing DCWriter5:', error);
            this.showError('Failed to initialize DCWriter5. Please refresh the page and try again.');
        }
    }
    
    setupGlobalEvents() {
        // Handle keyboard shortcuts at the application level
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key.toLowerCase()) {
                    case 's':
                        event.preventDefault();
                        this.toolbar.saveDocument();
                        break;
                    case 'o':
                        event.preventDefault();
                        this.toolbar.openDocument();
                        break;
                    case 'n':
                        event.preventDefault();
                        this.toolbar.newDocument();
                        break;
                    case 'p':
                        event.preventDefault();
                        this.toolbar.printDocument();
                        break;
                }
            }
            
            // Handle F1 for help
            if (event.key === 'F1') {
                event.preventDefault();
                this.showHelp();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Handle before unload to warn about unsaved changes
        window.addEventListener('beforeunload', (event) => {
            if (this.hasUnsavedChanges()) {
                event.preventDefault();
                event.returnValue = '';
                return '';
            }
        });
        
        // Handle drag and drop for file opening
        this.setupDragAndDrop();
        
        // Handle editor blur/focus for better UX
        this.editorElement.addEventListener('focus', () => {
            document.body.classList.add('editor-focused');
        });
        
        this.editorElement.addEventListener('blur', () => {
            document.body.classList.remove('editor-focused');
        });
    }
    
    setupDragAndDrop() {
        const dropZone = document.getElementById('document-container');
        
        dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', (event) => {
            event.preventDefault();
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = Array.from(event.dataTransfer.files);
            if (files.length > 0) {
                this.handleDroppedFile(files[0]);
            }
        });
        
        // Add drag over styles
        const style = document.createElement('style');
        style.textContent = `
            .drag-over {
                background-color: #e3f2fd !important;
                border: 2px dashed #2196f3 !important;
            }
            
            .editor-focused .dcwriter-editor {
                box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }
        `;
        document.head.appendChild(style);
    }
    
    async handleDroppedFile(file) {
        const fileInput = document.getElementById('file-input');
        
        // Create a new FileList containing the dropped file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        
        // Trigger the file open handler
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
    }
    
    handleResize() {
        // Adjust editor layout if needed
        // For now, just ensure the editor remains focused
        if (document.activeElement === this.editorElement) {
            this.editorElement.focus();
        }
    }
    
    hasUnsavedChanges() {
        // Simple check - in a real app, you'd want to track if content has changed
        // since last save
        const content = this.dcwriter.getPlainText().trim();
        return content.length > 0;
    }
    
    showHelp() {
        const helpModal = this.createHelpModal();
        document.body.appendChild(helpModal);
    }
    
    createHelpModal() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 24px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        modal.setAttribute('tabindex', '-1');
        
        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0;">DCWriter5 Help</h3>
                <button class="close-btn" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
            </div>
            
            <div style="line-height: 1.6;">
                <h4>Keyboard Shortcuts</h4>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                    <tr><td><code>Ctrl+N</code></td><td>New document</td></tr>
                    <tr><td><code>Ctrl+O</code></td><td>Open document</td></tr>
                    <tr><td><code>Ctrl+S</code></td><td>Save document</td></tr>
                    <tr><td><code>Ctrl+P</code></td><td>Print document</td></tr>
                    <tr><td><code>Ctrl+Z</code></td><td>Undo</td></tr>
                    <tr><td><code>Ctrl+Y / Ctrl+Shift+Z</code></td><td>Redo</td></tr>
                    <tr><td><code>Ctrl+B</code></td><td>Bold</td></tr>
                    <tr><td><code>Ctrl+I</code></td><td>Italic</td></tr>
                    <tr><td><code>Ctrl+U</code></td><td>Underline</td></tr>
                    <tr><td><code>F1</code></td><td>Show this help</td></tr>
                </table>
                
                <h4>Features</h4>
                <ul>
                    <li><strong>RTF Support:</strong> Import and export Rich Text Format files</li>
                    <li><strong>Text Formatting:</strong> Bold, italic, underline, strikethrough</li>
                    <li><strong>Font Control:</strong> Change font family and size</li>
                    <li><strong>Colors:</strong> Set text and background colors</li>
                    <li><strong>Alignment:</strong> Left, center, right, and justify text</li>
                    <li><strong>Lists:</strong> Create bullet and numbered lists</li>
                    <li><strong>File Operations:</strong> Open RTF, HTML, and text files</li>
                    <li><strong>Multiple Export Formats:</strong> Save as RTF, HTML, or plain text</li>
                    <li><strong>Drag & Drop:</strong> Drop files directly into the editor</li>
                    <li><strong>Print Support:</strong> Print documents with formatting</li>
                </ul>
                
                <h4>About DCWriter5</h4>
                <p>DCWriter5 is a powerful online RTF rich text editor that doesn't rely on HTML DOM manipulation. 
                It's designed for professional document editing with comprehensive formatting capabilities.</p>
                
                <p><strong>Version:</strong> 1.0.0<br>
                <strong>License:</strong> MIT License</p>
            </div>
        `;
        
        // Style the table
        const table = modal.querySelector('table');
        table.style.cssText = `
            border-collapse: collapse;
            width: 100%;
        `;
        
        const cells = modal.querySelectorAll('td');
        cells.forEach((cell, index) => {
            cell.style.cssText = `
                padding: 4px 8px;
                border-bottom: 1px solid #eee;
                ${index % 2 === 0 ? 'font-family: monospace; background: #f8f9fa;' : ''}
            `;
        });
        
        // Event listeners
        modal.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
            }
        });
        
        overlay.appendChild(modal);
        
        // Focus the modal
        setTimeout(() => modal.focus(), 100);
        
        return overlay;
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            max-width: 400px;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">Error</h3>
            <p style="margin: 0 0 15px 0;">${message}</p>
            <button onclick="this.parentElement.remove()" style="background: white; color: #dc3545; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                OK
            </button>
        `;
        
        document.body.appendChild(errorDiv);
    }
}

// Make the app available globally for debugging
window.DCWriter5App = DCWriter5App;