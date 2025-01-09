import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import type { MarkdownState } from './types';

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return code;
  },
});

function App() {
  const [state, setState] = useState<MarkdownState>(() => {
    const saved = localStorage.getItem('markdown-state');
    return saved ? JSON.parse(saved) : { markdown: '', html: '' };
  });

  useEffect(() => {
    localStorage.setItem('markdown-state', JSON.stringify(state));
  }, [state]);

  const handleMarkdownChange = (value: string) => {
    setState({
      markdown: value,
      html: marked(value),
    });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      handleMarkdownChange(text);
    } catch (err) {
      console.error('Error reading file:', err);
    }
  };

  const handleToolbarAction = (markdown: string) => {
    const textarea = document.querySelector('.ace_text-input') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = state.markdown;
      const newText = text.substring(0, start) + markdown + text.substring(end);
      handleMarkdownChange(newText);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto p-4 flex flex-col flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Markdown Editor</h1>
        <div className="flex-grow bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <Toolbar onAction={handleToolbarAction} />
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 min-h-0">
            <div className="border-r min-h-0">
              <Editor
                value={state.markdown}
                onChange={handleMarkdownChange}
                onFileUpload={handleFileUpload}
              />
            </div>
            <div className="min-h-0">
              <Preview html={state.html} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;