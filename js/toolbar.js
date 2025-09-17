/**
 * Toolbar functionality for DCWriter5
 * Handles all toolbar interactions and UI updates
 */

class ToolbarManager {
    constructor(dcwriter, rtfHandler) {
        this.dcwriter = dcwriter;
        this.rtfHandler = rtfHandler;
        this.editor = dcwriter.editor;
        
        this.init();
    }
    
    init() {
        this.bindToolbarEvents();
        this.bindEditorEvents();
        
        // Initial button state update
        this.updateToolbarStates();
    }
    
    bindToolbarEvents() {
        // Document operations
        document.getElementById('btn-new').addEventListener('click', () => this.newDocument());
        document.getElementById('btn-open').addEventListener('click', () => this.openDocument());
        document.getElementById('btn-save').addEventListener('click', () => this.saveDocument());
        document.getElementById('btn-print').addEventListener('click', () => this.printDocument());
        
        // Undo/Redo
        document.getElementById('btn-undo').addEventListener('click', () => this.dcwriter.undo());
        document.getElementById('btn-redo').addEventListener('click', () => this.dcwriter.redo());
        
        // Font controls
        document.getElementById('font-family').addEventListener('change', (e) => {
            this.dcwriter.setFontFamily(e.target.value);
        });
        
        document.getElementById('font-size').addEventListener('change', (e) => {
            this.dcwriter.setFontSize(parseInt(e.target.value));
        });
        
        // Format buttons
        document.getElementById('btn-bold').addEventListener('click', () => {
            this.dcwriter.toggleBold();
        });
        
        document.getElementById('btn-italic').addEventListener('click', () => {
            this.dcwriter.toggleItalic();
        });
        
        document.getElementById('btn-underline').addEventListener('click', () => {
            this.dcwriter.toggleUnderline();
        });
        
        document.getElementById('btn-strikethrough').addEventListener('click', () => {
            this.dcwriter.toggleStrikethrough();
        });
        
        // Alignment buttons
        document.getElementById('btn-align-left').addEventListener('click', () => {
            this.dcwriter.setAlignment('left');
        });
        
        document.getElementById('btn-align-center').addEventListener('click', () => {
            this.dcwriter.setAlignment('center');
        });
        
        document.getElementById('btn-align-right').addEventListener('click', () => {
            this.dcwriter.setAlignment('right');
        });
        
        document.getElementById('btn-align-justify').addEventListener('click', () => {
            this.dcwriter.setAlignment('justify');
        });
        
        // List buttons
        document.getElementById('btn-bullet-list').addEventListener('click', () => {
            this.insertBulletList();
        });
        
        document.getElementById('btn-number-list').addEventListener('click', () => {
            this.insertNumberList();
        });
        
        // Color controls
        document.getElementById('text-color').addEventListener('change', (e) => {
            this.dcwriter.setTextColor(e.target.value);
        });
        
        document.getElementById('bg-color').addEventListener('change', (e) => {
            this.dcwriter.setBackgroundColor(e.target.value);
        });
        
        // File input for opening files
        document.getElementById('file-input').addEventListener('change', (e) => {
            this.handleFileOpen(e);
        });
    }
    
    bindEditorEvents() {
        // Listen for format updates from the editor
        this.editor.addEventListener('formatUpdate', (e) => {
            this.updateFormatButtons(e.detail);
        });
        
        // Listen for status updates
        this.editor.addEventListener('statusUpdate', (e) => {
            this.updateStatusInfo(e.detail);
        });
        
        // Listen for cursor position updates
        this.editor.addEventListener('cursorUpdate', (e) => {
            this.updateCursorPosition(e.detail);
        });
    }
    
    updateToolbarStates() {
        // Update all toolbar states based on current selection
        this.dcwriter.updateFormatButtons();
        this.dcwriter.updateStatusInfo();
        this.dcwriter.updateCursorPosition();
    }
    
    updateFormatButtons(formatStates) {
        // Update format button active states
        document.getElementById('btn-bold').classList.toggle('active', formatStates.bold);
        document.getElementById('btn-italic').classList.toggle('active', formatStates.italic);
        document.getElementById('btn-underline').classList.toggle('active', formatStates.underline);
        document.getElementById('btn-strikethrough').classList.toggle('active', formatStates.strikethrough);
    }
    
    updateStatusInfo(statusInfo) {
        document.getElementById('word-count').textContent = `Words: ${statusInfo.words}`;
        document.getElementById('char-count').textContent = `Characters: ${statusInfo.characters}`;
    }
    
    updateCursorPosition(positionInfo) {
        document.getElementById('cursor-position').textContent = 
            `Line ${positionInfo.line}, Column ${positionInfo.column}`;
    }
    
    // Document operations
    newDocument() {
        if (confirm('Create a new document? Any unsaved changes will be lost.')) {
            this.dcwriter.newDocument();
        }
    }
    
    openDocument() {
        document.getElementById('file-input').click();
    }
    
    async handleFileOpen(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            let content;
            const extension = file.name.split('.').pop().toLowerCase();
            
            switch (extension) {
                case 'rtf':
                    content = await this.rtfHandler.readRtfFile(file);
                    break;
                case 'txt':
                    content = await this.rtfHandler.readTextFile(file);
                    break;
                case 'html':
                case 'htm':
                    content = await this.rtfHandler.readHtmlFile(file);
                    break;
                default:
                    throw new Error('Unsupported file type. Please use .rtf, .txt, or .html files.');
            }
            
            this.dcwriter.setContent(content);
            this.showNotification(`File "${file.name}" opened successfully.`);
        } catch (error) {
            this.showNotification(`Error opening file: ${error.message}`, 'error');
        }
        
        // Clear the file input
        event.target.value = '';
    }
    
    saveDocument() {
        const content = this.dcwriter.getContent();
        
        // Show save options
        this.showSaveDialog(content);
    }
    
    showSaveDialog(content) {
        const modal = this.createSaveModal(content);
        document.body.appendChild(modal);
        
        // Focus the modal
        modal.querySelector('.modal').focus();
    }
    
    createSaveModal(content) {
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
            max-width: 400px;
            width: 90%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        modal.setAttribute('tabindex', '-1');
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 16px 0;">Save Document</h3>
            <p style="margin: 0 0 16px 0; color: #666;">Choose a format to save your document:</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="save-btn" data-format="rtf" style="padding: 8px 16px; border: 1px solid #dee2e6; border-radius: 4px; background: white; cursor: pointer;">
                    💾 Save as RTF
                </button>
                <button class="save-btn" data-format="html" style="padding: 8px 16px; border: 1px solid #dee2e6; border-radius: 4px; background: white; cursor: pointer;">
                    🌐 Save as HTML
                </button>
                <button class="save-btn" data-format="txt" style="padding: 8px 16px; border: 1px solid #dee2e6; border-radius: 4px; background: white; cursor: pointer;">
                    📄 Save as Text
                </button>
            </div>
            <div style="margin-top: 16px; text-align: right;">
                <button class="cancel-btn" style="padding: 6px 12px; border: 1px solid #dee2e6; border-radius: 4px; background: white; cursor: pointer; margin-right: 8px;">
                    Cancel
                </button>
            </div>
        `;
        
        // Event listeners
        modal.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.dataset.format;
                this.downloadDocument(content, format);
                document.body.removeChild(overlay);
            });
        });
        
        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Keyboard support
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
            }
        });
        
        overlay.appendChild(modal);
        return overlay;
    }
    
    downloadDocument(content, format) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
        const filename = `document-${timestamp}`;
        
        switch (format) {
            case 'rtf':
                this.rtfHandler.downloadRtf(content, `${filename}.rtf`);
                break;
            case 'html':
                this.rtfHandler.downloadHtml(content, `${filename}.html`);
                break;
            case 'txt':
                this.rtfHandler.downloadText(content, `${filename}.txt`);
                break;
        }
        
        this.showNotification(`Document saved as ${format.toUpperCase()}.`);
    }
    
    printDocument() {
        const printWindow = window.open('', '_blank');
        const content = this.dcwriter.getContent();
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Document</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        line-height: 1.5; 
                        margin: 1in; 
                        color: black;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .text-justify { text-align: justify; }
                    @media print {
                        body { margin: 0.5in; }
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
    
    // List operations
    insertBulletList() {
        const selection = this.dcwriter.getSelection();
        if (selection && selection.range) {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.innerHTML = selection.text || 'List item';
            ul.appendChild(li);
            
            selection.range.deleteContents();
            selection.range.insertNode(ul);
            
            // Position cursor in the list item
            const newRange = document.createRange();
            newRange.selectNodeContents(li);
            newRange.collapse(false);
            this.dcwriter.setSelection(newRange);
            
            this.dcwriter.saveState();
        }
    }
    
    insertNumberList() {
        const selection = this.dcwriter.getSelection();
        if (selection && selection.range) {
            const ol = document.createElement('ol');
            const li = document.createElement('li');
            li.innerHTML = selection.text || 'List item';
            ol.appendChild(li);
            
            selection.range.deleteContents();
            selection.range.insertNode(ol);
            
            // Position cursor in the list item
            const newRange = document.createRange();
            newRange.selectNodeContents(li);
            newRange.collapse(false);
            this.dcwriter.setSelection(newRange);
            
            this.dcwriter.saveState();
        }
    }
    
    // Notification system
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: ${type === 'error' ? '#dc3545' : '#28a745'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            max-width: 300px;
            font-size: 14px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transition = 'opacity 0.3s ease';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }
}

// Export for use in other modules
window.ToolbarManager = ToolbarManager;