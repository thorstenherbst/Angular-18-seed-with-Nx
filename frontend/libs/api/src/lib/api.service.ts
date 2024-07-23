import { inject, Injectable, signal, Signal } from '@angular/core';
import { Board, MockBackendService } from '../../../../apps/frontend/src/app/service/mock-backend.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  mockBackend: MockBackendService = inject(MockBackendService);

  changeGameStatus(row: number, column: number, userSelectedState: string): Signal<Board> {
    return this.mockBackend.cellClicked(row, column,userSelectedState);
  }

  newGame(): Signal<Board> {
    return this.mockBackend.newGame;
  }


}
