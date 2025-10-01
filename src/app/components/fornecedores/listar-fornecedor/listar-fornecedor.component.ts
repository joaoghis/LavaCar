import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-fornecedor',
  imports: [],
  templateUrl: './listar-fornecedor.component.html',
  styleUrl: './listar-fornecedor.component.css'
})
export class ListarFornecedorComponent implements OnInit {
  fornecedores: Fornecedor[] = []
  constructor(private fornecedorService: FornecedorService, private router: Router) {}
  ngOnInit() {
    this.getAllFornecedores();
  }
  getAllFornecedores() {
    this.fornecedorService.getAllFornecedores().then(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }

  editFornecedor(id: number) {
    this.router.navigate(['/fornecedores/editar-fornecedor', id]);
  }

  deleteFornecedor(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta açâo não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fornecedorService.deleteFornecedor(id).then(() => {
          this.getAllFornecedores();
        });
        Swal.fire('Excluído!', 'O fornecedor foi excluído com sucesso!', 'success');
      }
    });
  }
}