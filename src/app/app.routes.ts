import { Routes } from '@angular/router';
import { CadastroFornecedorComponent } from './components/fornecedores/cadastro-fornecedor/cadastro-fornecedor.component';
import { ListarFornecedorComponent } from './components/fornecedores/listar-fornecedor/listar-fornecedor.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fornecedores/cadastro-fornecedor', component: CadastroFornecedorComponent },
    { path: 'fornecedores/listar-fornecedores', component: ListarFornecedorComponent},
    { path: 'fornecedores/editar-fornecedor/:id', component: CadastroFornecedorComponent},
];