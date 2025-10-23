import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../services/fornecedor.service';
import { DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';
import { DynamicFormField } from '../../../shared/dynamic-form/dynamic-form-field.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-fornecedor',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './cadastro-fornecedor.component.html'
})

export class CadastroFornecedorComponent implements OnInit {
  fornecedorId!: number;
  fields: DynamicFormField[] = [];
  initialData: any = {};
  constructor(private fornecedorService: FornecedorService, private route: ActivatedRoute, private router: Router) {
  }
  async ngOnInit() {
    this.fornecedorId = Number(this.route.snapshot.paramMap.get('id'));
    this.fields = [
      { name: 'nome', label: 'Nome do Fornecedor', type: 'text', validators: [] },
      { name: 'cnpj', label: 'CNPJ', type: 'text', validators: [] },
      { name: 'fone', label: 'Telefone', type: 'text', validators: [] }
    ];
    if (this.fornecedorId) {
      const fornecedor = await this.fornecedorService.getFornecedorById(this.fornecedorId);
      if (fornecedor) {
        this.initialData = {
          nome: fornecedor.nome,
          cnpj: fornecedor.cnpj,
          fone: fornecedor.fone
        };
      }
    }
  }
  async onFormSubmit(data: any) {
    if (!this.fornecedorId) {
      await this.fornecedorService.addFornecedor(data);
      Swal.fire('Sucesso', 'Fornecedor cadastrado com sucesso', 'success');
    } else {
      await this.fornecedorService.updateFornecedor({ ...data, id: this.fornecedorId });
      Swal.fire('Sucesso', 'Fornecedor atualizado com sucesso', 'success');
    }
    this.router.navigate(['fornecedores/listar-fornecedores']);
  } 
}