import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from './../../../services/servico.service';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-cadastro-servico',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.css'
})
export class CadastroServicoComponent implements OnInit {
  private fb = inject(FormBuilder);
  formServico = this.fb.group({
    nome: ['', Validators.required],
    descricao: [''],
    preco: [null as number | null, Validators.required],
    produtos: [null as number | null]
  });
  produtos: Produto[] = [];
  servicoId!: number;
  constructor(private servicoService: ServicoService, private produtoService: ProdutoService, private route: ActivatedRoute, private router: Router) {  
  }
  async ngOnInit() {

    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.servicoId) {
      const servico = await this.servicoService.getServicoById(this.servicoId);
      if (servico) {
        this.formServico.patchValue({
          nome: servico.nome,
          descricao: servico.descricao,
          preco: Number(servico.preco)
        });
      }
    }else {
      this.produtoService.getAllProdutos().then((produtos) => {
        this.produtos = produtos;
      });
    }
  }
  addServico() {
    if (this.formServico.valid) {
      const novoServico: Servico = {
        nome: this.formServico.value.nome!,
        descricao: this.formServico.value.descricao!,
        preco: this.formServico.value.preco!
      }
      this.servicoService.addServico(novoServico).then(() => {
        Swal.fire('Cadastro realizado!', 'O serviço foi cadastrado com sucesso.', 'success');
        this.router.navigate(['servicos/listar-servicos']);
      });
    }else {
      this.editServico();
    }
  }
  editServico() {
    if (this.formServico.valid) {
      const servicoEditado: Servico = {
        id: this.servicoId,
        nome: this.formServico.value.nome!,
        descricao: this.formServico.value.descricao!,
        preco: Number(this.formServico.value.preco!),
      };
    
      this.servicoService.updateServico(servicoEditado).then(() => {
        Swal.fire('Cadastro atualizado!', 'O serviço foi atualizado com sucesso.', 'success');
        this.router.navigate(['servicos/listar-servicos']);
      });
    }
  }
}