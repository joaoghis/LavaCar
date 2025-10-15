import { Component, OnInit } from '@angular/core';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servico.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-servicos',
  imports: [],
  templateUrl: './listar-servicos.component.html',
  styleUrl: './listar-servicos.component.css'
})
export class ListarServicosComponent implements OnInit {
  servicos: Servico[] = [];
  constructor(private servicoService: ServicoService, private router: Router) {  
  }

  ngOnInit() {
    this.getAllServicos();
  }
  getAllServicos() {
    this.servicoService.getAllServicos().then(servicos => {
      this.servicos = servicos;
    });
  }
  editServico(id: number) {
    this.router.navigate(['/servicos/editar-servico', id]);
  }
  deleteServico(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicoService.deleteServico(id).then(() => {
          this.getAllServicos();
        });
        Swal.fire('Excluído!', 'O serviço foi excluído com sucesso.', 'success');
      }
    });
  }
}