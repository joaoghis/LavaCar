import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Fornecedor } from '../models/fornecedor.model';
import { ProdutoServico } from '../models/produto-servico.model';
import { Produto } from '../models/produto.model';
import { Servico } from '../models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  fornecedores!: Table<Fornecedor, number>;
  produtos!: Table<Produto, number>;
  servicos!: Table<Servico, number>;
  produtosServico!: Table<ProdutoServico, [number, number]>;

  constructor() { 
    super('LavaCarDB');
    this.version(1).stores({
      fornecedores: '++id, nome, cnpj, fone',
      produtos: '++id, nome, preco, quantidade, fornecedorId',
      servicos: '++id, nome, descricao, preco',
      produtosServico: '[servicoId+produtoId], servicoId, produtoId, quantidade'
    });
  }
}
export const db = new DbService();