import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { FornecedorService } from '../../../services/fornecedor.service';

@Component({
  selector: 'app-listar-produtos-fornecedor',
  imports: [],
  templateUrl: './listar-produtos-fornecedor.component.html',
  styleUrl: './listar-produtos-fornecedor.component.css'
})
export class ListarProdutosFornecedorComponent {
  produtos: Produto[] = [];
  fornecedorId!: number;
  nomeFornecedor!: string;
  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private fornecedorService: FornecedorService) { 

  }
  ngOnInit() {
    this.fornecedorId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProdutosByFornecedorId(this.fornecedorId);
    this.getNomeFornecedorById(this.fornecedorId).then(() => {
      console.log("Nome do fornecedor")
    });
  }
  async getProdutosByFornecedorId(fornecedorId: number) {
    this.produtos = await this.produtoService.getProdutosByFornecedorId(fornecedorId);
  }
  async getNomeFornecedorById(fornecedorId: number) {
    const fornecedor = await this.fornecedorService.getFornecedorById(fornecedorId);
    if (fornecedor) {
      this.nomeFornecedor = fornecedor.nome;
    } else {
      this.nomeFornecedor = "Fornecedor não existente!";
    }
  }



}