import { Injectable } from '@angular/core';
import { Servico } from '../models/servico.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  constructor(private dbService: DbService) { 
  }
  addServico(servico: Servico) {
    return this.dbService.servicos.add(servico);
  }
  getAllServicos(): Promise<Servico[]> {
    return this.dbService.servicos.toArray();
  }
  getServicoById(id: number) {
    return this.dbService.servicos.get(id);
  }
  updateServico(servico: Servico) {
    return this.dbService.servicos.put(servico);
  }
  deleteServico(id: number) {
    return this.dbService.servicos.delete(id);
  }
}
