import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../../../services/servico.service';
import { DynamicFormComponent } from '../../../shared/dynamic-form/dynamic-form.component';
import { DynamicFormField } from '../../../shared/dynamic-form/dynamic-form-field.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-servico',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './cadastro-servico.component.html'
})

export class CadastroServicoComponent implements OnInit {
  servicoId!: number;
  fields: DynamicFormField[] = [];
  initialData: any = {};
  constructor(private servicoService: ServicoService, private route: ActivatedRoute, private router: Router) {
  }
  async ngOnInit() {
    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));
    this.fields = [
      { name: 'nome', label: 'Nome do Serviço', type: 'text', validators: [] },
      { name: 'descricao', label: 'Descrição', type: 'text', validators: [] },
      { name: 'preco', label: 'Preço', type: 'number', validators: [] }
    ];
    if (this.servicoId) {
      const servico = await this.servicoService.getServicoById(this.servicoId);
      if (servico) {
        this.initialData = {
          nome: servico.nome,
          descricao: servico.descricao,
          preco: servico.preco
        };
      }
    }
  }
  async onFormSubmit(data: any) {
    if (!this.servicoId) {
      await this.servicoService.addServico(data);
      Swal.fire('Sucesso', 'Serviço cadastrado com sucesso', 'success');
    } else {
      await this.servicoService.updateServico({ ...data, id: this.servicoId });
      Swal.fire('Sucesso', 'Serviço atualizado com sucesso', 'success');
    }
    this.router.navigate(['servicos/listar-servicos']);
  } 
}