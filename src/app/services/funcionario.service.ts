import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private dbService: DbService) { 
  }
  async addFuncionario(funcionario: Funcionario): Promise<number> {
    return await this.dbService.funcionarios.add(funcionario);
  }
  async getAllFuncionarios(): Promise<Funcionario[]> {
    return await this.dbService.funcionarios.toArray();
  }
  async getFuncionarioById(id: number): Promise<Funcionario | undefined> {
    return await this.dbService.funcionarios.get(id);
  }
  async updateFuncionario(funcionario: Funcionario): Promise<number> {
    return await this.dbService.funcionarios.put(funcionario);
  }
  async deleteFuncionario(id: number): Promise<void> {
    return await this.dbService.funcionarios.delete(id);
  }
}
