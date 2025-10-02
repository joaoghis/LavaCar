import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutosFornecedorComponent } from './listar-produtos-fornecedor.component';

describe('ListarProdutosFornecedorComponent', () => {
  let component: ListarProdutosFornecedorComponent;
  let fixture: ComponentFixture<ListarProdutosFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProdutosFornecedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProdutosFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
