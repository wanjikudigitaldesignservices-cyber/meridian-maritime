import { Bold, Italic, Heading2, Heading3, Link as LinkIcon, List, ListOrdered, Quote, Code, Image as ImageIcon, Minus } from 'lucide-react';

interface EditorToolbarProps {
  onInsert: (prefix: string, suffix?: string, defaultText?: string) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  const tools = [
    { icon: Bold, label: 'Bold', action: () => onInsert('**', '**', 'bold text') },
    { icon: Italic, label: 'Italic', action: () => onInsert('*', '*', 'italic text') },
    { divider: true },
    { icon: Heading2, label: 'Heading 2', action: () => onInsert('\n## ', '') },
    { icon: Heading3, label: 'Heading 3', action: () => onInsert('\n### ', '') },
    { divider: true },
    { icon: LinkIcon, label: 'Link', action: () => onInsert('[', '](url)', 'link text') },
    { icon: ImageIcon, label: 'Image', action: () => onInsert('![alt text](', ')', 'image url') },
    { divider: true },
    { icon: List, label: 'Bullet List', action: () => onInsert('\n- ', '') },
    { icon: ListOrdered, label: 'Numbered List', action: () => onInsert('\n1. ', '') },
    { icon: Quote, label: 'Blockquote', action: () => onInsert('\n> ', '') },
    { icon: Code, label: 'Code', action: () => onInsert('\n```\n', '\n```', 'code') },
    { icon: Minus, label: 'Divider', action: () => onInsert('\n\n---\n\n', '') },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-steel/20 bg-plimsoll rounded-t-sm border-b-0">
      {tools.map((tool, i) => 
        tool.divider ? (
          <div key={`div-${i}`} className="w-px h-5 bg-steel/20 mx-1" />
        ) : (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            onClick={tool.action}
            className="p-1.5 text-deck-grey hover:text-hull hover:bg-steel/10 rounded-sm transition-colors"
          >
            {tool.icon && <tool.icon className="w-4 h-4" />}
          </button>
        )
      )}
    </div>
  );
}
