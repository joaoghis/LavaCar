import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private dbService: DbService) { 
  }
  async addCliente(cliente: Cliente): Promise<number> {
    return await this.dbService.clientes.add(cliente);
  }
  async getAllClientes(): Promise<Cliente[]> {
    return await this.dbService.clientes.toArray();
  }
  async getClienteById(id: number): Promise<Cliente | undefined> {
    return await this.dbService.clientes.get(id);
  }
  async updateCliente(cliente: Cliente): Promise<number> {
    return await this.dbService.clientes.put(cliente);
  }
  async deleteCliente(id: number): Promise<void> {
    return await this.dbService.clientes.delete(id);
  }
}