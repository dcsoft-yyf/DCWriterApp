/**
 * DCWriter5 Core - RTF Rich Text Editor Engine
 * This implements the core editing functionality without relying on HTML DOM execCommand
 */

class DCWriter5Core {
    constructor(editorElement) {
        this.editor = editorElement;
        this.history = [];
        this.historyIndex = -1;
        this.currentSelection = null;
        this.isComposing = false;
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.editor.addEventListener('input', this.handleInput.bind(this));
        this.editor.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.editor.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.editor.addEventListener('compositionstart', () => this.isComposing = true);
        this.editor.addEventListener('compositionend', () => this.isComposing = false);
        this.editor.addEventListener('selectionchange', this.handleSelectionChange.bind(this));
        this.editor.addEventListener('paste', this.handlePaste.bind(this));
        
        // Initialize with empty history state
        this.saveState();
    }
    
    handleInput(event) {
        if (!this.isComposing) {
            // Debounce saving state to avoid too many history entries
            clearTimeout(this.saveStateTimeout);
            this.saveStateTimeout = setTimeout(() => {
                this.saveState();
            }, 500);
        }
        
        // Update status information
        this.updateStatusInfo();
    }
    
    handleKeyDown(event) {
        // Handle keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key.toLowerCase()) {
                case 'z':
                    event.preventDefault();
                    if (event.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    event.preventDefault();
                    this.redo();
                    break;
                case 'b':
                    event.preventDefault();
                    this.toggleBold();
                    break;
                case 'i':
                    event.preventDefault();
                    this.toggleItalic();
                    break;
                case 'u':
                    event.preventDefault();
                    this.toggleUnderline();
                    break;
            }
        }
        
        // Handle special keys
        switch (event.key) {
            case 'Tab':
                event.preventDefault();
                this.insertText('\t');
                break;
            case 'Enter':
                // Let the browser handle Enter naturally for now
                setTimeout(() => this.saveState(), 100);
                break;
        }
    }
    
    handleKeyUp(event) {
        this.updateCursorPosition();
    }
    
    handleSelectionChange() {
        this.currentSelection = this.getSelection();
        this.updateFormatButtons();
    }
    
    handlePaste(event) {
        event.preventDefault();
        
        // Get pasted data
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text/plain');
        
        // Insert as plain text to maintain control
        this.insertText(pastedData);
    }
    
    // Selection and range utilities
    getSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            return {
                range: selection.getRangeAt(0),
                text: selection.toString(),
                collapsed: selection.isCollapsed
            };
        }
        return null;
    }
    
    setSelection(range) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    // Text manipulation methods
    insertText(text) {
        const selection = this.getSelection();
        if (selection && selection.range) {
            selection.range.deleteContents();
            const textNode = document.createTextNode(text);
            selection.range.insertNode(textNode);
            
            // Move cursor to end of inserted text
            const newRange = document.createRange();
            newRange.setStartAfter(textNode);
            newRange.collapse(true);
            this.setSelection(newRange);
        }
        
        this.saveState();
    }
    
    // Format toggling methods
    toggleBold() {
        this.toggleFormat('bold', 'B', 'STRONG');
    }
    
    toggleItalic() {
        this.toggleFormat('italic', 'I', 'EM');
    }
    
    toggleUnderline() {
        this.toggleFormat('underline', 'U');
    }
    
    toggleStrikethrough() {
        this.toggleFormat('strikethrough', 'S', 'STRIKE');
    }
    
    toggleFormat(formatType, tagName, altTagName = null) {
        const selection = this.getSelection();
        if (!selection || !selection.range) return;
        
        const range = selection.range;
        
        // Check if selection is already formatted
        const isFormatted = this.isSelectionFormatted(formatType, tagName, altTagName);
        
        if (isFormatted) {
            this.removeFormat(range, tagName, altTagName);
        } else {
            this.applyFormat(range, tagName);
        }
        
        this.saveState();
        this.updateFormatButtons();
    }
    
    isSelectionFormatted(formatType, tagName, altTagName = null) {
        const selection = this.getSelection();
        if (!selection || !selection.range) return false;
        
        let element = selection.range.commonAncestorContainer;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }
        
        // Check if current element or any parent has the format
        while (element && element !== this.editor) {
            if (element.tagName === tagName || 
                (altTagName && element.tagName === altTagName)) {
                return true;
            }
            element = element.parentNode;
        }
        
        return false;
    }
    
    applyFormat(range, tagName) {
        if (range.collapsed) {
            // If no selection, just set up formatting for next typed text
            const formatElement = document.createElement(tagName);
            range.insertNode(formatElement);
            range.selectNodeContents(formatElement);
            this.setSelection(range);
        } else {
            // Wrap selection with format element
            const formatElement = document.createElement(tagName);
            try {
                range.surroundContents(formatElement);
            } catch (e) {
                // If we can't surround (e.g., partial element selection), extract and wrap
                const contents = range.extractContents();
                formatElement.appendChild(contents);
                range.insertNode(formatElement);
            }
        }
    }
    
    removeFormat(range, tagName, altTagName = null) {
        let element = range.commonAncestorContainer;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }
        
        // Find the formatting element to remove
        while (element && element !== this.editor) {
            if (element.tagName === tagName || 
                (altTagName && element.tagName === altTagName)) {
                // Replace the formatting element with its contents
                const parent = element.parentNode;
                while (element.firstChild) {
                    parent.insertBefore(element.firstChild, element);
                }
                parent.removeChild(element);
                break;
            }
            element = element.parentNode;
        }
    }
    
    // Font and style methods
    setFontFamily(fontFamily) {
        this.applyStyle('fontFamily', fontFamily);
    }
    
    setFontSize(fontSize) {
        this.applyStyle('fontSize', fontSize + 'pt');
    }
    
    setTextColor(color) {
        this.applyStyle('color', color);
    }
    
    setBackgroundColor(color) {
        this.applyStyle('backgroundColor', color);
    }
    
    applyStyle(property, value) {
        const selection = this.getSelection();
        if (!selection || !selection.range) return;
        
        const range = selection.range;
        
        if (range.collapsed) {
            // Create a span for future text
            const span = document.createElement('span');
            span.style[property] = value;
            range.insertNode(span);
            range.selectNodeContents(span);
            this.setSelection(range);
        } else {
            // Wrap selection in span with style
            const span = document.createElement('span');
            span.style[property] = value;
            try {
                range.surroundContents(span);
            } catch (e) {
                const contents = range.extractContents();
                span.appendChild(contents);
                range.insertNode(span);
            }
        }
        
        this.saveState();
    }
    
    // Alignment methods
    setAlignment(alignment) {
        const selection = this.getSelection();
        if (!selection || !selection.range) return;
        
        let element = selection.range.commonAncestorContainer;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }
        
        // Find the paragraph element
        while (element && element !== this.editor && element.tagName !== 'P') {
            element = element.parentNode;
        }
        
        if (element && element.tagName === 'P') {
            // Remove existing alignment classes
            element.className = element.className.replace(/text-(left|center|right|justify)/g, '').trim();
            // Add new alignment class
            if (alignment !== 'left') { // left is default, no class needed
                element.className += ' text-' + alignment;
            }
        }
        
        this.saveState();
    }
    
    // History management
    saveState() {
        const state = this.editor.innerHTML;
        
        // Don't save if content hasn't changed
        if (this.history[this.historyIndex] === state) {
            return;
        }
        
        // Remove any future history if we're not at the end
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        // Add new state
        this.history.push(state);
        this.historyIndex++;
        
        // Limit history size
        if (this.history.length > 100) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.editor.innerHTML = this.history[this.historyIndex];
            this.updateFormatButtons();
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.editor.innerHTML = this.history[this.historyIndex];
            this.updateFormatButtons();
        }
    }
    
    // Status and UI updates
    updateFormatButtons() {
        // This will be called by the toolbar to update button states
        const event = new CustomEvent('formatUpdate', {
            detail: {
                bold: this.isSelectionFormatted('bold', 'B', 'STRONG'),
                italic: this.isSelectionFormatted('italic', 'I', 'EM'),
                underline: this.isSelectionFormatted('underline', 'U'),
                strikethrough: this.isSelectionFormatted('strikethrough', 'S', 'STRIKE')
            }
        });
        this.editor.dispatchEvent(event);
    }
    
    updateStatusInfo() {
        const text = this.editor.textContent || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        
        const event = new CustomEvent('statusUpdate', {
            detail: {
                words: words,
                characters: chars
            }
        });
        this.editor.dispatchEvent(event);
    }
    
    updateCursorPosition() {
        const selection = this.getSelection();
        if (selection && selection.range) {
            // Calculate line and column (simplified)
            const range = selection.range;
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(this.editor);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            const text = preCaretRange.toString();
            const lines = text.split('\n');
            const line = lines.length;
            const column = lines[lines.length - 1].length + 1;
            
            const event = new CustomEvent('cursorUpdate', {
                detail: {
                    line: line,
                    column: column
                }
            });
            this.editor.dispatchEvent(event);
        }
    }
    
    // Document operations
    newDocument() {
        this.editor.innerHTML = '<p><br></p>';
        this.history = [];
        this.historyIndex = -1;
        this.saveState();
        
        // Focus and position cursor
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(this.editor.firstChild, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        
        this.editor.focus();
    }
    
    getContent() {
        return this.editor.innerHTML;
    }
    
    setContent(html) {
        this.editor.innerHTML = html;
        this.saveState();
    }
    
    getPlainText() {
        return this.editor.textContent || '';
    }
}

// Export for use in other modules
window.DCWriter5Core = DCWriter5Core;