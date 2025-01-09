export interface MarkdownState {
  markdown: string;
  html: string;
}

export interface ToolbarButton {
  label: string;
  icon: React.ComponentType;
  action: () => void;
}