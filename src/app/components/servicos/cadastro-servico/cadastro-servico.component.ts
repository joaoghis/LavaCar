import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from './../../../services/servico.service';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../models/produto-servico.model';

@Component({
  selector: 'app-cadastro-servico',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.css'
})
export class CadastroServicoComponent implements OnInit {
  private fb = inject(FormBuilder);
  produtos: Produto[] = [];
  servicoId!: number;
  formServico = this.fb.group({
    nome: ['', Validators.required],
    descricao: [''],
    preco: [null as number | null, Validators.required],
    produtos: [null as number | null]
  });

  constructor(private servicoService: ServicoService, private produtoServico: ProdutoService, private router: Router, private route: ActivatedRoute) {  
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
      this.produtoServico.getAllProdutos().then((produtos) => {
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
    }
  }
}