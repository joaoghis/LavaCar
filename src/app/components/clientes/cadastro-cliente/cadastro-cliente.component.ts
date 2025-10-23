import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-cadastro-cliente',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './cadastro-cliente.component.html'
})
export class CadastroClienteComponent implements OnInit {
  clienteId!: number;
  fotoPreviewUrl: string | ArrayBuffer | null = null;
  private fb = inject(FormBuilder);
  formCliente = this.fb.group({
    nome: ['', Validators.required],
    fone: ['', Validators.required],
    email: ['', Validators.required],
    fotoUrl: [''],
    endereco: ['', Validators.required]
  });
  ngOnInit(): void {
  }

  constructor() {
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.type.match(/image\/*/) == null) {
        //this.toastService.showError("Arquivo inválido!", "Somente arquivos de imagem são permitidos.", 8000);
        this.formCliente.get('fotoUrl')?.setValue('');
        this.fotoPreviewUrl = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoPreviewUrl = reader.result;
        this.formCliente.get('fotoUrl')?.setValue(reader.result as string);
      };
      reader.onerror = (error) => {
        //this.toastService.showError("Erro", "Erro ao ler o arquivo!");
        this.formCliente.get('fotoUrl')?.setValue('');
        this.fotoPreviewUrl = null;
      };
    }else {
      this.formCliente.get('fotoUrl')?.setValue('');
      this.fotoPreviewUrl = null;
    }
  }
}
