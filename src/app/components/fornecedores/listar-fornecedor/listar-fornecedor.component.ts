import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-fornecedor',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './listar-fornecedor.component.html'
})

export class ListarFornecedorComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  filtro = new FormControl('');
  fornecedoresFiltrados: Fornecedor[] = [];
  fornecedoresPaginados: Fornecedor[] = [];
  paginaAtual = 1;
  itensPorPagina = 3;
  constructor(private fornecedorService: FornecedorService, private router: Router) {}
  async ngOnInit() {
    this.filtro.valueChanges.subscribe(() => {
      this.aplicarFiltrosEAtualizarPagina();
    });
    await this.carregarFornecedores();
  }
  async carregarFornecedores(): Promise<void> {
    this.fornecedores = await this.getAllFornecedores();
    this.aplicarFiltrosEAtualizarPagina();
  }
  async getAllFornecedores(): Promise<Fornecedor[]> {
    return await this.fornecedorService.getAllFornecedores();
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
  viewProdutosFornecedor(id: number) {
    this.router.navigate(['/fornecedor', id, 'produtos']);
  }
  getFornecedoresFiltrados(): Fornecedor[] {
    const filtro = this.filtro.value?.toLowerCase() || '';
    return this.fornecedores.filter(fornecedor => {
      return fornecedor.nome.toLowerCase().includes(filtro) || fornecedor.cnpj.toLowerCase().includes(filtro) || fornecedor.fone.toLowerCase().includes(filtro);
    });
  }
  aplicarFiltrosEAtualizarPagina(): void {
    this.fornecedoresFiltrados = this.getFornecedoresFiltrados();
    this.paginaAtual = 1;
    this.atualizarPagina();
  }
  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.fornecedoresPaginados = this.fornecedoresFiltrados.slice(inicio, fim);
  }
  get totalPages(): number {
    return Math.ceil(this.fornecedoresFiltrados.length / this.itensPorPagina);
  }
  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.paginaAtual = pagina;
      this.atualizarPagina();
    }
  }
  anterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPagina();
    }
  }
  proxima(): void {
    if (this.paginaAtual < this.totalPages) {
      this.paginaAtual++;
      this.atualizarPagina();
    }
  }
  get paginasArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  } 
}