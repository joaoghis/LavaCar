import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent implements OnInit {
  private fb = inject(FormBuilder);
  formProduto = this.fb.group({
    nome: ['', Validators.required],
    preco: [null as number | null, Validators.required],
    quantidade: [null as number | null, Validators.required],
    fornecedorId: [null as number | null, Validators.required]
  });
  fornecedores: Fornecedor[] = [];
  produtoId!: number;
  constructor(private produtoService: ProdutoService, private fornecedorService: FornecedorService, private route: ActivatedRoute, private router: Router) {
  }
  async ngOnInit() {
    this.loadFornecedores();
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.produtoId) {
      const produto = await this.produtoService.getProdutoByID(this.produtoId);
      if (produto) {
        this.formProduto.patchValue({
          nome: produto.nome,
          preco: Number(produto.preco),
          quantidade: Number(produto.quantidade),
          fornecedorId: Number(produto.fornecedorId)
        });
      };
    }
  }
  addProduto() {
    if (this.formProduto.valid) {
      if (!this.produtoId) {
        const novoProduto: Produto = {
          nome: this.formProduto.value.nome!,
          preco: Number(this.formProduto.value.preco!),
          quantidade: Number(this.formProduto.value.quantidade!),
          fornecedorId: Number(this.formProduto.value.fornecedorId!)
        };
        this.produtoService.addProduto(novoProduto).then(() => {
          Swal.fire('Cadastro realizado!', 'O produto foi cadastrado com sucesso!', 'success');
          this.router.navigate(['produtos/listar-produtos']);
        });
      } else {
        this.editProduto();
      }
    } 
  }
  editProduto() {
    if (this.formProduto.valid) {
      const produtoEditado: Produto = {
        id: this.produtoId,
        nome: this.formProduto.value.nome!,
        preco: Number(this.formProduto.value.preco!),
        quantidade: Number(this.formProduto.value.quantidade!),
        fornecedorId: Number(this.formProduto.value.fornecedorId!)
      };
      this.produtoService.updateProduto(produtoEditado).then(() => {
        Swal.fire('Cadastro realizado!', 'O produto foi atualizado com sucesso.', 'success');
        this.router.navigate(['produtos/listar-produtos']);
      });
    }
  }

  loadFornecedores() {
    this.fornecedorService.getAllFornecedores().then(fornecedores => {
      this.fornecedores = fornecedores;
    });
  }
}