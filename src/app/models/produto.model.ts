export class Produto {
    id?: number;
    nome: string;
    preco: number;
    quantidade: number;
    fornecedorId: number;
    nomeFornecedor?: String;

    constructor(nome: string, preco: number, quantidade: number, fornecedorId: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.fornecedorId = fornecedorId;
    }
}