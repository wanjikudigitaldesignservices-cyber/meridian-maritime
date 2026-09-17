export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Code Blocks
  html = html.replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>');
  
  // Inline Code
  html = html.replace(/`([^`\n]+)`/gm, '<code>$1</code>');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Horizontal Rule
  html = html.replace(/^---$/gim, '<hr />');

  // Lists (simplistic approach)
  // Unordered
  html = html.replace(/^[-*+] (.*$)/gim, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\s*<ul>/gim, '');
  
  // Ordered
  html = html.replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>');
  html = html.replace(/<\/ol>\s*<ol>/gim, '');

  // Paragraphs (wrap anything not inside a block tag in <p>)
  // A simple hack: split by double newline
  const blocks = html.split(/\n\s*\n/);
  html = blocks.map(block => {
    if (
      block.match(/^<(h|ul|ol|li|blockquote|pre|hr|div|img)/i) ||
      block.trim() === ''
    ) {
      return block;
    }
    // Convert single newlines to <br> for remaining blocks
    return `<p>${block.trim().replace(/\n/g, '<br />')}</p>`;
  }).join('\n\n');

  return html;
}
