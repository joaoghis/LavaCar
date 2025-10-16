import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Projeto LavaCar';

  verificarNumeroPrimo(numero: number): boolean {
    if (numero <= 1) return false;

    for (let i = 2; i < numero; i++) {
      if (numero % i === 0) return false;
    }

    return true;
  }

  somarNaturais(n: number): number {
    let soma = 0;
    for (let i = 1; i <= n; i++) {
      soma += i;
    }
    return soma;
  }

  encontrarMaior(lista: number[]): number {
    let maior = lista[0];

    for (let i = 1; i < lista.length; i++) {
      if (lista[i] > maior) {
        maior = lista[i];
      }
    }

    return maior;
  }

  gerarTabuada(numero: number): string[] {
    const resultado: string[] = [];

    for (let i = 1; i <= 10; i++) {
      resultado.push(`${numero} x ${i} = ${numero * i}`);
    }

    return resultado;
  }

  ngOnInit() {    
    // console.log("------------------------------");
    // const n = 7;
    // console.log(`O número ${n} é primo?`, this.verificarNumeroPrimo(n));
    // console.log("------------------------------");
    // const m = 10;
    // console.log(`Soma dos ${m} primeiros números naturais:`, this.somarNaturais(m));
    // console.log("------------------------------");
    // const numeros = [5, 9, 2, 15, 1];
    // console.log('Maior número:', this.encontrarMaior(numeros));
    // console.log("------------------------------");
    // const numero = 7;
    // const tabuada = this.gerarTabuada(numero);
    // console.log(`Tabuada do ${numero}:`);
    // tabuada.forEach(linha => console.log(linha));
  }

}
