import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private dbService: DbService) { 
  }
  addProduto(produto: Produto) {
    return this.dbService.produtos.add(produto);
  }
  getAllProdutos(): Promise<Produto[]> {
    return this.dbService.produtos.toArray();
  }
  updateProduto(produto: Produto) {
    return this.dbService.produtos.put(produto);
  }
  deleteProduto(id: number) {
    return this.dbService.produtos.delete(id);
  }
  getProdutoByID(id: number) {
    return this.dbService.produtos.get(id);
  }
  getProdutosByFornecedorId(fornecedorId: number): Promise<Produto[]> {
    return this.dbService.produtos.where('fornecedorId').equals(fornecedorId).toArray();
  }
}