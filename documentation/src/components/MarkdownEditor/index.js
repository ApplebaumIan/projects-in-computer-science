import React from 'react';
export default function MarkdownEditor() {
    const [markdown, setMarkdown] = React.useState(`# Welcome to Markdown!

## Getting Started
This is a **bold** statement and this is *italic* text.

### Lists
- First item
- Second item
- Third item

### Code
Here's some inline \`code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Links
[Visit Docusaurus](https://docusaurus.io)

> This is a blockquote. Great for highlighting important information!
`);

    // Simple markdown renderer for common syntax
    const renderMarkdown = (text) => {
        return text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/\`(.*?)\`/gim, '<code>$1</code>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
            .replace(/```[\s\S]*?```/gim, '<pre><code>$&</code></pre>')
            .replace(/```/g, '')
            .replace(/\n/gim, '<br/>');
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            <div style={{padding: '10px', borderRight: '1px solid #ccc'}}>
                <h4 style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>
                    ✏️ Edit Markdown Here:
                </h4>
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    style={{
                        width: '100%',
                        height: 'calc(100% - 30px)',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        padding: '10px',
                        backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Type your markdown here..."
                />
            </div>
            <div style={{padding: '10px', overflow: 'auto'}}>
                <h4 style={{margin: '0 0 10px 0', fontSize: '14px', color: '#666'}}>
                    👁️ Live Preview:
                </h4>
                <div
                    style={{
                        height: 'calc(100% - 30px)',
                        overflow: 'auto',
                        padding: '10px',
                        backgroundColor: '#fff',
                        border: '1px solid #eee',
                        borderRadius: '4px'
                    }}
                    dangerouslySetInnerHTML={{
                        __html: renderMarkdown(markdown)
                    }}
                />
            </div>
        </div>
    );
}
