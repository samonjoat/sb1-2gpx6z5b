import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Copy, Download, FileText, Edit2 } from 'lucide-react';

interface PreviewProps {
  html: string;
}

export const Preview: React.FC<PreviewProps> = ({ html }) => {
  const [isEditing, setIsEditing] = useState(false);
  const sanitizedHtml = DOMPurify.sanitize(html);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([sanitizedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTextContent = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHtml;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        <button
          onClick={() => copyToClipboard(sanitizedHtml)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
        >
          <Copy size={16} />
          Copy HTML
        </button>
        <button
          onClick={() => copyToClipboard(getTextContent())}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
        >
          <FileText size={16} />
          Copy Text
        </button>
        <button
          onClick={downloadHtml}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50"
        >
          <Download size={16} />
          Download HTML
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
            isEditing ? 'text-blue-600 bg-blue-50' : 'text-gray-700 bg-white'
          } rounded-md shadow-sm hover:bg-gray-50`}
        >
          <Edit2 size={16} />
          {isEditing ? 'View Mode' : 'Edit Mode'}
        </button>
      </div>
      <div className="flex-grow custom-scrollbar">
        {isEditing ? (
          <div
            className="prose max-w-none min-h-full p-4 border rounded-lg focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        ) : (
          <div
            className="prose max-w-none p-4"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        )}
      </div>
    </div>
  );
};