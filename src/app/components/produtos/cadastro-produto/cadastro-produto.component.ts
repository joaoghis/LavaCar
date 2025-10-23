import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';
import { DynamicFormField } from '../../../shared/dynamic-form/dynamic-form-field.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-produto',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './cadastro-produto.component.html'
})
export class CadastroProdutoComponent implements OnInit {
  produtoId!: number;
  fields: DynamicFormField[] = [];
  initialData: any = {};
  constructor(private produtoService: ProdutoService, private fornecedorService: FornecedorService, private route: ActivatedRoute, private router: Router) {  
  }
  async ngOnInit() {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    const fornecedores = await this.fornecedorService.getAllFornecedores();
    this.fields = [
      { name: 'nome', label: 'Nome do Produto', type: 'text', validators: [] },
      { name: 'preco', label: 'Preço', type: 'number', validators: [] },
      { name: 'quantidade', label: 'Quantidade', type: 'number', validators: [] },
      { name: 'fornecedorId', label: 'Fornecedor', type: 'select', options: fornecedores.map(f => ({ value: f.id, label: `${f.nome} - ${f.cnpj} - ${f.fone}` }))}
    ];
    if (this.produtoId) {
      const produto = await this.produtoService.getProdutoById(this.produtoId);
      if (produto) {
        this.initialData = {
          nome: produto.nome,
          preco: produto.preco,
          quantidade: produto.quantidade,
          fornecedorId: produto.fornecedorId
        };
      }
    }
  }
  async onFormSubmit(data: any) {
    data.fornecedorId = Number(data.fornecedorId);
    if (!this.produtoId) {
      await this.produtoService.addProduto(data);
      Swal.fire('Sucesso', 'Produto cadastrado com sucesso', 'success');
    } else {
      await this.produtoService.updateProduto({ ...data, id: this.produtoId });
      Swal.fire('Sucesso', 'Produto atualizado com sucesso', 'success');
    }
    this.router.navigate(['produtos/listar-produtos']);
  }
}