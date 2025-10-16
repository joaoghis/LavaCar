import { ProdutoServico } from './produto-servico.model';

describe('ProdutoServico', () => {
  it('should create an instance', () => {
    expect(new ProdutoServico(1, 2, 3)).toBeTruthy();
  });
});
