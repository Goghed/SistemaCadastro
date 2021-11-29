import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EstudanteSearchComponent } from '../estudante-search/estudante-search.component';
import { EstudanteService } from '../estudante.service';
import { ESTUDANTES } from '../mock-estudantes';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let EstudanteService;
  let getestudantesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    EstudanteService = jasmine.createSpyObj('EstudanteService', ['getestudantes']);
    getestudantesSpy = EstudanteService.getestudantes.and.returnValue(of(ESTUDANTES));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, EstudanteSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: EstudanteService, useValue: EstudanteService}]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top estudantes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top estudantes');
  });

  it('should call EstudanteService', waitForAsync(() => {
       expect(getestudantesSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
