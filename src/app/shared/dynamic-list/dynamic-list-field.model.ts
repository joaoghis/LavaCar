export interface DynamicListColumn {
  field: string;
  label: string;
  width?: string;
  type?: 'text' | 'number' | 'date';
}

export interface DynamicListAction {
  icon: string;
  tooltip: string;
  colorClass?: string;
  action: string;
}