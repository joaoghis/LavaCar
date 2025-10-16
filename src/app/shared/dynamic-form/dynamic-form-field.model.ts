export type FieldType = 'text' | 'number' | 'select';

export interface DynamicFormField {
  name: string;
  label: string;
  type: FieldType;
  validators?: any[];
  options?: { value: any; label: string }[];
}