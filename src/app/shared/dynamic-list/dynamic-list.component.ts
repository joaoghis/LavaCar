import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicListColumn, DynamicListAction } from './dynamic-list-field.model';

@Component({
  selector: 'app-dynamic-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-list.component.html'
})
export class DynamicListComponent {
  @Input() title = '';
  @Input() columns: DynamicListColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: DynamicListAction[] = [];
  @Input() itemsPerPage = 5;

  @Output() actionClick = new EventEmitter<{ action: string; item: any }>();

  filtro = new FormControl('');
  filteredData: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;

  ngOnInit() {
    this.filteredData = [...this.data];
    this.updatePage();

    this.filtro.valueChanges.subscribe(() => this.applyFilter());
  }

  ngOnChanges() {
    this.applyFilter();
  }

  applyFilter() {
    const filtro = this.filtro.value?.toLowerCase() || '';
    this.filteredData = this.data.filter(item =>
      this.columns.some(col => item[col.field]?.toString().toLowerCase().includes(filtro))
    );
    this.currentPage = 1;
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePage();
    }
  }

  onAction(action: string, item: any) {
    this.actionClick.emit({ action, item });
  }
}