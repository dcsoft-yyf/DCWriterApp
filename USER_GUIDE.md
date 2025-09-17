# DCWriter5 Demo - User Guide

DCWriter5 is a powerful online RTF (Rich Text Format) rich text editor that doesn't rely on HTML DOM manipulation. This demo showcases its comprehensive text editing capabilities.

## Getting Started

1. Open `index.html` in a web browser
2. The editor loads with sample content to demonstrate its features
3. Start typing to create your own documents

## Features

### Document Operations
- **New Document** (Ctrl+N): Create a new blank document
- **Open File** (Ctrl+O): Import RTF, HTML, or text files
- **Save Document** (Ctrl+S): Export as RTF, HTML, or plain text
- **Print** (Ctrl+P): Print the document with formatting preserved

### Text Formatting
- **Bold** (Ctrl+B): Make text bold
- **Italic** (Ctrl+I): Make text italic
- **Underline** (Ctrl+U): Underline text
- **Strikethrough**: Add strikethrough formatting

### Font Controls
- **Font Family**: Choose from Arial, Times New Roman, Helvetica, Georgia, Verdana, or Courier New
- **Font Size**: Select sizes from 8pt to 72pt

### Text Alignment
- **Left Align**: Align text to the left
- **Center**: Center text
- **Right Align**: Align text to the right
- **Justify**: Justify text (even spacing)

### Lists
- **Bullet Lists**: Create bulleted lists
- **Numbered Lists**: Create numbered lists

### Colors
- **Text Color**: Change the color of selected text
- **Background Color**: Change the background color of selected text

### Advanced Features
- **Undo/Redo** (Ctrl+Z / Ctrl+Y): Unlimited undo and redo
- **Drag & Drop**: Drop files directly into the editor to open them
- **Status Bar**: Shows word count, character count, and cursor position
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## File Format Support

### Import Formats
- **RTF (.rtf)**: Rich Text Format files
- **HTML (.html, .htm)**: HTML documents
- **Text (.txt)**: Plain text files

### Export Formats
- **RTF**: Maintains rich formatting
- **HTML**: Web-compatible format
- **Plain Text**: Removes all formatting

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+N | New document |
| Ctrl+O | Open file |
| Ctrl+S | Save document |
| Ctrl+P | Print |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl+Shift+Z | Redo (alternative) |
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+U | Underline |
| F1 | Show help |

## Technical Details

DCWriter5 is built using modern web technologies:

- **Pure JavaScript**: No external dependencies
- **Custom RTF Parser**: Handles RTF import/export
- **Non-DOM Based**: Doesn't rely on `document.execCommand`
- **Event-Driven Architecture**: Modular and extensible
- **Cross-Browser Compatible**: Works in all modern browsers

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Usage Tips

1. **Text Selection**: Click and drag to select text for formatting
2. **Multiple Formats**: Apply multiple formats (bold + italic + underline) to the same text
3. **File Handling**: Use drag-and-drop for quick file opening
4. **Mobile Support**: The editor is touch-friendly on mobile devices
5. **Print Preview**: Use your browser's print preview to see how documents will print

## Architecture Overview

The DCWriter5 demo consists of four main components:

1. **DCWriter5Core** (`js/dcwriter-core.js`): Core editing engine
2. **RTFHandler** (`js/rtf-handler.js`): RTF format processing
3. **ToolbarManager** (`js/toolbar.js`): UI controls and interactions
4. **Main Application** (`js/main.js`): Application initialization and coordination

## Customization

The editor can be customized by modifying:

- **Styles**: Edit CSS files in the `styles/` directory
- **Functionality**: Extend JavaScript modules in the `js/` directory
- **Toolbar**: Add or remove buttons in `index.html` and `toolbar.js`

## License

DCWriter5 is released under the MIT License. See `LICENSE` file for details.

## Support

For issues or questions about DCWriter5, please refer to the project repository or documentation.