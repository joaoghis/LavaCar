import { Routes } from '@angular/router';
import { CadastroFornecedorComponent } from './components/fornecedores/cadastro-fornecedor/cadastro-fornecedor.component';
import { ListarFornecedorComponent } from './components/fornecedores/listar-fornecedor/listar-fornecedor.component';
import { CadastroProdutoComponent } from './components/produtos/cadastro-produto/cadastro-produto.component';
import { ListarProdutosComponent } from './components/produtos/listar-produtos/listar-produtos.component';
import { ListarProdutosFornecedorComponent } from './components/fornecedores/listar-produtos-fornecedor/listar-produtos-fornecedor.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fornecedores/cadastro-fornecedor', component: CadastroFornecedorComponent },
    { path: 'fornecedores/listar-fornecedores', component: ListarFornecedorComponent},
    { path: 'fornecedores/editar-fornecedor/:id', component: CadastroFornecedorComponent},
    { path: 'produtos/cadastro-produto', component: CadastroProdutoComponent },
    { path: 'produtos/listar-produtos', component: ListarProdutosComponent },
    { path: 'produtos/editar-produto/:id', component: CadastroProdutoComponent },
    { path: 'fornecedor/:id/produtos', component: ListarProdutosFornecedorComponent },
];