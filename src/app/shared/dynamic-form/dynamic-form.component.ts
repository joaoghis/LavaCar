import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormField } from './dynamic-form-field.model';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormField[] = [];
  @Input() initialData: any = {};
  @Input() submitText = 'Salvar';
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] && this.fields) {
      this.createForm();
    }
    if (changes['initialData'] && this.form) {
      this.form.patchValue(this.initialData);
    }
  }
  createForm() {
    const group: any = {};
    for (const field of this.fields) {
      group[field.name] = ['', field.validators ?? []];
    }
    this.form = this.fb.group(group);
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  inputClasses(name: string) {
    const control = this.form.get(name);
    return {
      'is-invalid': control?.invalid && control?.touched,
      'is-valid': control?.valid && control?.touched
    };
  }
}