import { Component, OnInit } from '@angular/core';

import { Estudante } from '../estudante';
import { ESTUDANTES } from '../mock-estudantes';
import { EstudanteService } from '../estudante.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css'],
})
export class EstudantesComponent implements OnInit {
  
  selectedEstudante?: Estudante;
  estudante: Estudante[] = [];

  constructor(private estudanteService: EstudanteService, private MessageService: MessageService) { }

  ngOnInit(): void {
    this.getEstudantes();
  }

  onselect(estudante:Estudante): void {
    this.selectedEstudante = estudante;
    this.MessageService.add('EstudantesComponents: Selected estudante id=${estudante.id}');
  }

  getEstudantes(): void {
    this.estudanteService.getEstudantes()
      .subscribe(estudantes => this.estudante = estudantes);

  }

}
