import { Injectable } from '@angular/core';
import { ProdutoServico } from './../models/produto-servico.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServicoService {
  constructor(private dbService: DbService) { 
  }
  getAllProdutosServicos(): Promise<ProdutoServico[]> {
    return this.dbService.produtosServico.toArray();
  }

  //Associação
  async getAssociacoesByServicoId(servicoId: number): Promise<ProdutoServico[]> {
    return await this.dbService.produtosServico.where('servicoId').equals(servicoId).toArray();
  }
  async getAssociacoesById(servicoId: number, produtoId: number): Promise<ProdutoServico[]> {
    return await this.dbService.produtosServico.where({ servicoId: servicoId, produtoId: produtoId }).toArray();
  }
  async deleteServicoProdutoAssociacao(servicoId: number, produtoId: number): Promise<void> {
    return await this.dbService.produtosServico.delete([servicoId, produtoId]);
  }
    async addMultiplosProdutosServicoAssociacoes(associations: ProdutoServico[]): Promise<[number, number][]> {
    return await this.dbService.produtosServico.bulkPut(associations) as unknown as Promise<[number, number][]>;
  }
}
