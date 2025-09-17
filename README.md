# DCWriter5App

A powerful open-source online RTF rich text editor that does not rely on HTML DOM manipulation. Especially suitable for toB (business-to-business) development.

![DCWriter5 Demo](https://github.com/user-attachments/assets/fef0258f-be67-4add-8b08-308f22fa861e)

## ✨ Features

- 📝 **Rich Text Editing**: Bold, italic, underline, strikethrough formatting
- 🎨 **Font Control**: Multiple font families and sizes
- 🌈 **Color Support**: Text and background color customization
- 📄 **Document Operations**: New, open, save, and print functionality
- 📋 **File Format Support**: RTF, HTML, and plain text import/export
- ↩️ **Undo/Redo**: Unlimited undo and redo capabilities
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🚫 **No DOM Dependency**: Custom implementation without `execCommand`
- ⚡ **Fast Performance**: Lightweight and efficient

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dcsoft-yyf/DCWriter5App.git
   cd DCWriter5App
   ```

2. **Open the demo**:
   Simply open `index.html` in your web browser, or serve it using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Start editing**:
   The editor loads with sample content. Start typing to create your documents!

## 🎯 Use Cases

- **Document Management Systems**: Corporate document creation and editing
- **Content Management**: Blog posts, articles, and web content
- **Email Editors**: Rich text email composition
- **Note-Taking Applications**: Personal and professional note management
- **Educational Platforms**: Student assignments and course materials
- **Collaboration Tools**: Team document editing and sharing

## 📚 Documentation

- **[User Guide](USER_GUIDE.md)**: Comprehensive guide for end users
- **[API Documentation](docs/api.md)**: For developers integrating DCWriter5
- **[Customization Guide](docs/customization.md)**: How to customize and extend

## 🔧 Technical Architecture

DCWriter5 is built with a modular architecture:

- **Core Engine** (`js/dcwriter-core.js`): Text editing and formatting logic
- **RTF Handler** (`js/rtf-handler.js`): RTF format import/export
- **Toolbar Manager** (`js/toolbar.js`): UI controls and interactions
- **Application Layer** (`js/main.js`): Integration and coordination

## 🌟 Key Advantages

### Traditional Editors vs DCWriter5

| Feature | Traditional Editors | DCWriter5 |
|---------|-------------------|-----------|
| DOM Dependency | Uses `execCommand` | Custom implementation |
| Browser Compatibility | Limited | Universal |
| Performance | Can be slow | Optimized |
| Customization | Difficult | Highly flexible |
| RTF Support | Limited/None | Full support |
| Mobile Support | Poor | Excellent |

## 🎨 Customization

DCWriter5 is designed to be highly customizable:

```javascript
// Initialize with custom options
const editor = new DCWriter5Core(editorElement, {
    fontFamilies: ['Arial', 'Helvetica', 'Times'],
    fontSize: { min: 8, max: 72, default: 12 },
    colors: ['#000000', '#FF0000', '#00FF00'],
    features: {
        tables: true,
        images: true,
        links: true
    }
});
```

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

DCWriter5App is released under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve DCWriter5
- Inspired by the need for a reliable, DOM-independent rich text editor
- Built with modern web standards and best practices

## 📞 Support

- 📧 **Email**: [your-email@domain.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/dcsoft-yyf/DCWriter5App/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/dcsoft-yyf/DCWriter5App/discussions)

---

**Made with ❤️ by the DCWriter5 Team**
