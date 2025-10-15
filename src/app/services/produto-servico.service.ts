import { Injectable } from '@angular/core';
import { ProdutoService } from './../models/produto-servico.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServicoService {
  constructor(private dbService: DbService) { 
  }
  getAllProdutosServicos(): Promise<ProdutoService[]> {
    return this.dbService.produtosServico.toArray();
  }
}
