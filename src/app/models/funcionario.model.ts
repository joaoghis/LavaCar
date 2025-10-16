import { Pessoa } from './pessoa.model';

export class Funcionario extends Pessoa {
    funcao: string;
    dataAdmissao: Date;

    constructor(nome: string, fone: string, email: string, funcao: string, dataAdmissao: Date, fotoUrl?: string) {
        super(nome, fone, email, fotoUrl);
        this.funcao = funcao;
        this.dataAdmissao = dataAdmissao;
    }
}