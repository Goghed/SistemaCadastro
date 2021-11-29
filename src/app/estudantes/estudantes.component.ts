import { Component, OnInit } from '@angular/core';

import { Estudante } from '../estudante';
import { EstudanteService } from '../estudante.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class estudantesComponent implements OnInit {
  estudantes: Estudante[] = [];

  constructor(private EstudanteService: EstudanteService) { }

  ngOnInit(): void {
    this.getestudantes();
  }

  getestudantes(): void {
    this.EstudanteService.getestudantes()
    .subscribe(estudantes => this.estudantes = estudantes);
  }

  add(nome: string, curso: string): void {
    nome = nome.trim();
    curso = curso.trim();
    if (!nome) { return; }
    this.EstudanteService.addEstudante({ nome } as Estudante)
      .subscribe(estudante => {
        this.estudantes.push(estudante);
      });      
  } 

  delete(estudante: Estudante): void {
    this.estudantes = this.estudantes.filter(h => h !== estudante);
    this.EstudanteService.deleteEstudante(estudante.id).subscribe();
  }

}
