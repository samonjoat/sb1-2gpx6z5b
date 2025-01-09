import React from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import { FileText, Upload } from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (file: File) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-pointer">
          <Upload size={16} />
          Upload Markdown
          <input
            type="file"
            className="hidden"
            accept=".md,.txt,.markdown"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex-grow custom-scrollbar">
        <AceEditor
          mode="markdown"
          theme="github"
          value={value}
          onChange={onChange}
          name="markdown-editor"
          width="100%"
          height="100%"
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};