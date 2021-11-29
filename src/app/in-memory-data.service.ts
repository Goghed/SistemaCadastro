import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Estudante } from './estudante';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const estudantes = [
      { id: 11, nome: 'Dr Nice', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34 },
      { id: 12, nome: 'Narco', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 13, nome: 'Bombasto', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 14, nome: 'Celeritas', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 15, nome: 'Magneta', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 16, nome: 'RubberMan', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 17, nome: 'Dynama', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 18, nome: 'Dr IQ', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 19, nome: 'Magma', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  },
      { id: 20, nome: 'Tornado', curso:'ADS', semestre: 2, sexo: 'Masculino', idade:34  }
    ];
    return {estudantes};
  }

  // Overrides the genId method to ensure that a estudante always has an id.
  // If the estudantes array is empty,
  // the method below returns the initial number (11).
  // if the estudantes array is not empty, the method below returns the highest
  // estudante id + 1.
  genId(estudantes: Estudante[]): number {
    return estudantes.length > 0 ? Math.max(...estudantes.map(estudante => estudante.id)) + 1 : 11;
  }
}
