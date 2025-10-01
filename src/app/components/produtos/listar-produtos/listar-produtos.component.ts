import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { CommonModule } from '@angular/common';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-produtos',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.css'
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  fornecedoresMap: Map<number, string> = new Map();

  constructor(private produtoService: ProdutoService, private fornecedorService: FornecedorService, private router: Router) {
  }
  ngOnInit() {
    this.getAllProdutos();
  }
  getAllProdutos() {
    this.produtoService.getAllProdutos().then(produtos => {
      this.produtos = produtos;
      this.resolveNomesFornecedorProdutos();
    });
  }
  editProduto(id: number) {
    this.router.navigate(['/produtos/editar-produto', id]);
  }
  deleteProduto(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.deleteProduto(id).then(() => {
          this.getAllProdutos();
        });
        Swal.fire('Excluído!', 'O produto foi excluído com sucesso.', 'success');
      }
    });
  }

  resolveNomesFornecedorProdutos() {
    this.produtos.forEach(produto => {
      if (produto.fornecedorId) {
        if (this.fornecedoresMap.has(produto.fornecedorId)) {
          produto.nomeFornecedor = this.fornecedoresMap.get(produto.fornecedorId);
        } else {
          this.fornecedorService.getFornecedorById(produto.fornecedorId).then((fornecedor: Fornecedor | undefined) => {
            if (fornecedor !== undefined) {
              produto.nomeFornecedor = fornecedor.nome;
              this.fornecedoresMap.set(produto.fornecedorId!, fornecedor.nome);
            }
          });
        }
      }
    });
  }
}