import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudante';
import { EstudanteService } from '../estudante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  estudantes: Estudante[] = [];

  constructor(private EstudanteService: EstudanteService) { }

  ngOnInit(): void {
    this.getestudantes();
  }

  getestudantes(): void {
    this.EstudanteService.getestudantes()
      .subscribe(estudantes => this.estudantes = estudantes.slice(1, 5));
  }
}
