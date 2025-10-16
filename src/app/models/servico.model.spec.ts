import { Servico } from './servico.model';

describe('Servico', () => {
  it('should create an instance', () => {
    expect(new Servico('A', 'B', 1)).toBeTruthy();
  });
});
