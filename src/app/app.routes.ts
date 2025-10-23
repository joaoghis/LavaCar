import { Routes } from '@angular/router';
import { CadastroFornecedorComponent } from './components/fornecedores/cadastro-fornecedor/cadastro-fornecedor.component';
import { ListarFornecedorComponent } from './components/fornecedores/listar-fornecedor/listar-fornecedor.component';
import { CadastroProdutoComponent } from './components/produtos/cadastro-produto/cadastro-produto.component';
import { ListarProdutosComponent } from './components/produtos/listar-produtos/listar-produtos.component';
import { CadastroServicoComponent } from './components/servicos/cadastro-servico/cadastro-servico.component';
import { ListarServicosComponent } from './components/servicos/listar-servicos/listar-servicos.component';
import { ListarProdutosFornecedorComponent } from './components/fornecedores/listar-produtos-fornecedor/listar-produtos-fornecedor.component';
import { AssociacaoProdutosServicoComponent } from './components/servicos/associacao-produtos-servico/associacao-produtos-servico.component';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fornecedores/cadastro-fornecedor', component: CadastroFornecedorComponent },
    { path: 'fornecedores/listar-fornecedores', component: ListarFornecedorComponent},
    { path: 'fornecedores/editar-fornecedor/:id', component: CadastroFornecedorComponent},
    { path: 'fornecedor/:id/produtos', component: ListarProdutosFornecedorComponent },
    { path: 'produtos/cadastro-produto', component: CadastroProdutoComponent },
    { path: 'produtos/listar-produtos', component: ListarProdutosComponent },
    { path: 'produtos/editar-produto/:id', component: CadastroProdutoComponent },
    { path: 'servicos/cadastro-servico', component: CadastroServicoComponent },
    { path: 'servicos/listar-servicos', component: ListarServicosComponent },
    { path: 'servicos/editar-servico/:id', component: CadastroServicoComponent },
    { path: 'servico/:id/produtos', component: AssociacaoProdutosServicoComponent },
    { path: 'clientes/cadastro-cliente', component: CadastroClienteComponent },
    { path: 'clientes/listar-clientes', component: ListarClientesComponent },
];