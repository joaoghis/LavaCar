import { Produto } from './produto.model';

describe('Produto', () => {
  it('should create an instance', () => {
    expect(new Produto('A', 1, 2, 3)).toBeTruthy();
  });
});