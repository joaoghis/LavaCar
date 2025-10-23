import { Injectable } from '@angular/core';
import { Fornecedor } from '../models/fornecedor.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  constructor(private dbService: DbService) { 
  }
  addFornecedor(fornecedor: Fornecedor) {
    return this.dbService.fornecedores.add(fornecedor);
  }
  getAllFornecedores(): Promise<Fornecedor[]> {
    return this.dbService.fornecedores.toArray();
  }
  getFornecedorById(id: number) {
    return this.dbService.fornecedores.get(id);
  }
  updateFornecedor(fornecedor: Fornecedor) {
    return this.dbService.fornecedores.put(fornecedor);
    }

  deleteFornecedor(id: number) {
    return this.dbService.fornecedores.delete(id);
  }
}