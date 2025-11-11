import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DynamicListComponent } from '../../../shared/dynamic-list/dynamic-list.component';
import { DynamicListColumn, DynamicListAction } from '../../../shared/dynamic-list/dynamic-list-field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-fornecedor',
  standalone: true,
  imports: [CommonModule, DynamicListComponent],
  templateUrl: './listar-fornecedor.component.html'
})
export class ListarFornecedorComponent implements OnInit {
  fornecedores: any[] = [];

  columns: DynamicListColumn[] = [
    { field: 'id', label: '#', width: '10%' },
    { field: 'nome', label: 'Nome' },
    { field: 'cnpj', label: 'CNPJ' },
    { field: 'fone', label: 'Telefone' }
  ];

  actions: DynamicListAction[] = [
    { icon: 'bi bi-pen', tooltip: 'Editar', colorClass: 'text-primary', action: 'edit' },
    { icon: 'bi bi-trash', tooltip: 'Excluir', colorClass: 'text-danger', action: 'delete' },
    { icon: 'bi bi-eye', tooltip: 'Ver produtos', colorClass: 'text-success', action: 'view' }
  ];

  constructor(private fornecedorService: FornecedorService, private router: Router) {}

  async ngOnInit() {
    this.fornecedores = await this.fornecedorService.getAllFornecedores();
  }

  async handleAction(event: { action: string; item: any }) {
    const { action, item } = event;
    switch (action) {
      case 'edit':
        this.router.navigate(['/fornecedores/editar-fornecedor', item.id]);
        break;

      case 'delete':
        Swal.fire({
          title: 'Tem certeza?',
          text: 'Esta ação não pode ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, excluir!',
          cancelButtonText: 'Cancelar'
        }).then(async result => {
          if (result.isConfirmed) {
            await this.fornecedorService.deleteFornecedor(item.id);
            this.fornecedores = await this.fornecedorService.getAllFornecedores();
            Swal.fire('Excluído!', 'Fornecedor removido com sucesso!', 'success');
          }
        });
        break;

      case 'view':
        this.router.navigate(['/fornecedor', item.id, 'produtos']);
        break;
    }
  }
}