import { Pessoa } from './pessoa.model';

export class Cliente extends Pessoa {
    endereco: string;
    
    constructor(nome: string, fone: string, email: string, endereco: string, fotoUrl?: string) {
        super(nome, fone, email, fotoUrl);
        this.endereco = endereco;
    }
}