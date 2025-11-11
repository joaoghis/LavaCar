import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { DynamicListComponent } from '../../../shared/dynamic-list/dynamic-list.component';
import { DynamicListColumn } from '../../../shared/dynamic-list/dynamic-list-field.model';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-listar-produtos-fornecedor',
  standalone: true,
  imports: [CommonModule, DynamicListComponent],
  templateUrl: './listar-produtos-fornecedor.component.html'
})
export class ListarProdutosFornecedorComponent implements OnInit {
  produtos: Produto[] = [];
  fornecedorId!: number;
  nomeFornecedor = '';

  columns: DynamicListColumn[] = [
    { field: 'id', label: '#', width: '10%' },
    { field: 'nome', label: 'Nome', width: '40%' },
    { field: 'preco', label: 'Preço', width: '25%' },
    { field: 'quantidade', label: 'Quantidade', width: '25%' }
  ];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService
  ) {}

  async ngOnInit() {
    this.fornecedorId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadProdutos();
    await this.loadNomeFornecedor();
  }

  async loadProdutos() {
    this.produtos = await this.produtoService.getProdutosByFornecedorId(this.fornecedorId);
  }

  async loadNomeFornecedor() {
    const fornecedor = await this.fornecedorService.getFornecedorById(this.fornecedorId);
    this.nomeFornecedor = fornecedor ? fornecedor.nome : 'Fornecedor não existente!';
  }
}