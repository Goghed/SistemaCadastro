import { Component, OnInit } from '@angular/core';

import { Estudante } from '../estudante';
import { EstudanteService } from '../estudante.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class EstudantesComponent implements OnInit {
  estudante_service: Estudante[] = [];

  constructor(private estudanteService: EstudanteService) { }

  ngOnInit(): void {
    this.getEstudantes();
  }

  getEstudantes(): void {
    this.estudanteService.getEstudante()
    .subscribe(estudantes => this.estudantes = estudantes);
  }
}
