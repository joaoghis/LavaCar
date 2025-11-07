import { ValidatorFn } from '@angular/forms';

export type FieldType = 'text' | 'number' | 'select' | 'date';

export interface DynamicFormField {
  name: string;
  label: string;
  type: FieldType;
  validators?: ValidatorFn[];
  options?: { value: any; label: string }[];
  disabled?: boolean;
}