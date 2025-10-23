import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { ServicoService } from '../../../services/servico.service';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoServicoService } from '../../../services/produto-servico.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProdutoServico } from '../../../models/produto-servico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-associacao-produtos-servico',
  imports: [CommonModule, DragDropModule],
  templateUrl: './associacao-produtos-servico.component.html',
  styleUrls: ['./associacao-produtos-servicos.component.css']
})
export class AssociacaoProdutosServicoComponent implements OnInit {
  produtos: Produto[] = [];
  produtosSelecionadosIds: Set<number> = new Set<number>();
  servicoId!: number;
  produtosServicos: ProdutoServico[] = [];
  produtosOriginal: Produto[] = [];
  produtosSelecionados: Produto[] = [];
  produtoIdSelecionado!: number;
  qtdeProduto!: number;

  constructor(private servicoService: ServicoService, private produtoService: ProdutoService, private produtoServicoService: ProdutoServicoService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.servicoId) {
      const servico = await this.servicoService.getServicoById(this.servicoId);
    }
    this.produtoService.getAllProdutos().then((produtos) => {
      this.produtos = produtos;
      this.produtosOriginal = produtos;
    });
    this.loadAllProdutosAssociacoesIndexedDb();
  }

  async loadAllProdutosAssociacoesIndexedDb(): Promise<void> {
    try {
      const associations: any[] = await
        this.produtoServicoService.getAssociacoesByServicoId(this.servicoId);
      this.produtosSelecionadosIds = new Set(associations.map((assoc) => assoc.produtoId));
      const produtosPromises = Array.from(this.produtosSelecionadosIds).map(idprod =>
        this.produtoService.getProdutoById(idprod)
      );
      const produtosEncontrados = await Promise.all(produtosPromises);
      for (const produto of produtosEncontrados) {
        if (produto) {
          const indexParaRemover = this.produtosOriginal.findIndex(p => p.id === produto.id);
          if (indexParaRemover > -1) {
            const produtoMovido = this.produtosOriginal.splice(indexParaRemover, 1)[0];
            this.produtosSelecionados.push(produtoMovido);
          }
        }
      }
    }catch (error) {
      console.error('Erro ao carregar produtos associados:', error);
    }
  }

  dropped(event: CdkDragDrop<Produto[]>, isConcluded: boolean) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const produto = event.container.data[event.currentIndex];
      if (produto.id !== undefined) {
        if (this.produtosSelecionadosIds.has(produto.id)) {
          this.produtosSelecionadosIds.delete(produto.id);
          this.produtoIdSelecionado = produto.id;
          this.produtoServicoService.getAssociacoesById(this.servicoId, produto.id).then((associacoes: ProdutoServico[]) => {
            if (produto.id !== undefined) {
              this.produtoServicoService.deleteServicoProdutoAssociacao(this.servicoId, produto.id);
            }
          });
        }else {
          this.produtoIdSelecionado = produto.id;
          this.solicitarQuantidadeDoProduto();
        }
      }
    }
  }

  async solicitarQuantidadeDoProduto(): Promise<void> {
    const { value: quantidadeInput } = await Swal.fire({
      title: 'Quantidade do Produto',
      input: 'number',
      inputLabel: 'Digite a quantidade do produto',
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          return 'Por favor, digite a quantidade válida e maior que zero!';
        }
        return null;
      }
    });
    if (quantidadeInput !== undefined && quantidadeInput !== null && !isNaN(Number(quantidadeInput))) {
      this.qtdeProduto = Number(quantidadeInput);
      this.confirmAdicaoProdutoQuantidade();
    }
  }

  confirmAdicaoProdutoQuantidade(): void {
    this.produtosSelecionadosIds.add(this.produtoIdSelecionado);
    const novaAssociacaoProdutoServico: ProdutoServico = {
      servicoId: this.servicoId,
      produtoId: this.produtoIdSelecionado,
      quantidade: this.qtdeProduto
    };
    this.produtosServicos.push(novaAssociacaoProdutoServico);
    this.produtoServicoService.addMultiplosProdutosServicoAssociacoes(this.produtosServicos);
  }
}
