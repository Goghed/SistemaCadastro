import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudante';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudantesComponent implements OnInit {

  estudante: Estudante = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
