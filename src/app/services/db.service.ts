import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Fornecedor } from '../models/fornecedor.model';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  fornecedores!: Table<Fornecedor, number>;
  produtos!: Table<Produto, number>;
  constructor() { 
    super('LavaCarDB');
    this.version(1).stores({
      fornecedores: '++id, nome, cnpj, fone',
      produtos: '++id, nome, preco, quantidade, fornecedorId',
    });
  }
}
export const db = new DbService();