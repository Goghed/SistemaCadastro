import { Component, OnInit, Input } from '@angular/core';
import { Estudante } from '../estudante';

@Component({
  selector: 'app-estudante-detalhe',
  templateUrl: './estudante-detalhe.component.html',
  styleUrls: ['./estudante-detalhe.component.css']
})
export class EstudanteDetalheComponent implements OnInit {

  @Input() estudante?: Estudante;

  constructor() { }

  ngOnInit(): void {
  }

}
