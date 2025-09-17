/**
 * RTF Handler - Handles RTF format import/export
 * Basic RTF support for the DCWriter5 editor
 */

class RTFHandler {
    constructor() {
        this.rtfToHtmlMap = {
            '\\b': '<strong>',
            '\\b0': '</strong>',
            '\\i': '<em>',
            '\\i0': '</em>',
            '\\ul': '<u>',
            '\\ul0': '</u>',
            '\\strike': '<s>',
            '\\strike0': '</s>',
            '\\par': '</p><p>',
            '\\line': '<br>',
            '\\tab': '\t'
        };
        
        this.htmlToRtfMap = {
            '<strong>': '\\b ',
            '</strong>': '\\b0 ',
            '<b>': '\\b ',
            '</b>': '\\b0 ',
            '<em>': '\\i ',
            '</em>': '\\i0 ',
            '<i>': '\\i ',
            '</i>': '\\i0 ',
            '<u>': '\\ul ',
            '</u>': '\\ul0 ',
            '<s>': '\\strike ',
            '</s>': '\\strike0 ',
            '<p>': '\\par ',
            '</p>': '',
            '<br>': '\\line ',
            '<br/>': '\\line ',
            '<br />': '\\line '
        };
    }
    
    // Convert RTF to HTML
    rtfToHtml(rtfContent) {
        try {
            // Remove RTF header and control info
            let content = rtfContent.replace(/^{\\rtf1[^{}]*{/, '');
            content = content.replace(/}$/, '');
            
            // Handle font table and color table (basic removal for now)
            content = content.replace(/{\\fonttbl[^{}]*}/g, '');
            content = content.replace(/{\\colortbl[^{}]*}/g, '');
            
            // Convert RTF formatting to HTML
            for (const [rtf, html] of Object.entries(this.rtfToHtmlMap)) {
                const regex = new RegExp(rtf.replace(/\\/g, '\\\\'), 'g');
                content = content.replace(regex, html);
            }
            
            // Remove remaining RTF control words
            content = content.replace(/\\[a-z]+[0-9]*\s?/g, '');
            content = content.replace(/{|}/g, '');
            
            // Clean up and wrap in paragraphs
            content = content.trim();
            if (content && !content.startsWith('<p>')) {
                content = '<p>' + content;
            }
            if (content && !content.endsWith('</p>')) {
                content = content + '</p>';
            }
            
            // Fix empty paragraphs
            content = content.replace(/<p>\s*<\/p>/g, '<p><br></p>');
            
            return content || '<p><br></p>';
        } catch (error) {
            console.error('Error converting RTF to HTML:', error);
            return '<p>Error loading RTF content</p>';
        }
    }
    
    // Convert HTML to RTF
    htmlToRtf(htmlContent) {
        try {
            let content = htmlContent;
            
            // Convert HTML formatting to RTF
            for (const [html, rtf] of Object.entries(this.htmlToRtfMap)) {
                const regex = new RegExp(html.replace(/[<>]/g, m => '\\' + m), 'gi');
                content = content.replace(regex, rtf);
            }
            
            // Remove HTML tags that don't have RTF equivalents
            content = content.replace(/<[^>]*>/g, '');
            
            // Clean up extra whitespace
            content = content.replace(/\s+/g, ' ').trim();
            
            // Add RTF header and footer
            const rtfHeader = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
            const rtfFooter = '}';
            
            return rtfHeader + content + rtfFooter;
        } catch (error) {
            console.error('Error converting HTML to RTF:', error);
            return '{\\rtf1\\ansi\\deff0 Error generating RTF content}';
        }
    }
    
    // Generate RTF content from editor
    exportToRtf(editorContent) {
        const rtfContent = this.htmlToRtf(editorContent);
        return rtfContent;
    }
    
    // Import RTF content to editor
    importFromRtf(rtfContent) {
        const htmlContent = this.rtfToHtml(rtfContent);
        return htmlContent;
    }
    
    // Create downloadable RTF file
    downloadRtf(content, filename = 'document.rtf') {
        const rtfContent = this.exportToRtf(content);
        const blob = new Blob([rtfContent], { type: 'application/rtf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Read RTF file
    readRtfFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const rtfContent = e.target.result;
                    const htmlContent = this.importFromRtf(rtfContent);
                    resolve(htmlContent);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
    
    // Export as plain text
    exportToText(editorContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = editorContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
    
    // Download as plain text
    downloadText(content, filename = 'document.txt') {
        const textContent = this.exportToText(content);
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Export as HTML
    downloadHtml(content, filename = 'document.html') {
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.5; margin: 40px; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-justify { text-align: justify; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Import from plain text
    importFromText(textContent) {
        // Convert plain text to HTML paragraphs
        const lines = textContent.split('\n');
        const paragraphs = lines.map(line => {
            const trimmed = line.trim();
            return trimmed ? `<p>${this.escapeHtml(trimmed)}</p>` : '<p><br></p>';
        });
        
        return paragraphs.join('');
    }
    
    // Read text file
    readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const textContent = e.target.result;
                    const htmlContent = this.importFromText(textContent);
                    resolve(htmlContent);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
    
    // Read HTML file
    readHtmlFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    let htmlContent = e.target.result;
                    
                    // Extract body content if it's a full HTML document
                    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                    if (bodyMatch) {
                        htmlContent = bodyMatch[1];
                    }
                    
                    // Clean up and ensure we have paragraphs
                    htmlContent = htmlContent.trim();
                    if (!htmlContent.includes('<p>') && !htmlContent.includes('<div>')) {
                        htmlContent = `<p>${htmlContent}</p>`;
                    }
                    
                    resolve(htmlContent);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
    
    // Utility function to escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other modules
window.RTFHandler = RTFHandler;