import React from 'react';
import { Bold, Italic, Link, Code, List, ListOrdered, Image, Quote } from 'lucide-react';
import type { ToolbarButton } from '../types';

interface ToolbarProps {
  onAction: (action: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  const buttons: ToolbarButton[] = [
    { label: 'Bold', icon: Bold, action: () => onAction('**Bold**') },
    { label: 'Italic', icon: Italic, action: () => onAction('*Italic*') },
    { label: 'Link', icon: Link, action: () => onAction('[Link](url)') },
    { label: 'Code', icon: Code, action: () => onAction('`code`') },
    { label: 'List', icon: List, action: () => onAction('- List item') },
    { label: 'Ordered List', icon: ListOrdered, action: () => onAction('1. List item') },
    { label: 'Image', icon: Image, action: () => onAction('![Alt text](image-url)') },
    { label: 'Quote', icon: Quote, action: () => onAction('> Quote') },
  ];

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
      {buttons.map((button) => (
        <button
          key={button.label}
          onClick={() => button.action()}
          className="p-2 text-gray-700 hover:bg-gray-200 rounded"
          title={button.label}
        >
          <button.icon size={16} />
        </button>
      ))}
    </div>
  );
};