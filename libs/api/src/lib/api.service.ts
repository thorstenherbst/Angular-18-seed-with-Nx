import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { PeopleDTO, PeopleResultDTO } from './people';
import { environment } from '../../../../environments/environment';
import { Board, MockBackendService } from './mock-backend.service';

const initialValue: PeopleDTO[] = [{uid: '', name: '', url: ''}]
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  mockBackend: MockBackendService = inject(MockBackendService);

  changeGameStatus(board: Board, row: number, column: number, userSelectedState: string): Signal<Board> {
    return this.mockBackend.cellClicked(board, row, column,userSelectedState);
  }

  newGame(): Signal<Board> {
    return this.mockBackend.newGame;
  }

  private static BASE_URL = environment.baseUrl;
  private _items = signal(initialValue);

  public get items(): Signal<PeopleDTO[]>{
    return this._items;
  }

  constructor(private http: HttpClient){}
  public getAll(): Observable<PeopleDTO[]>{
    return this.getFromApi(`${ApiService.BASE_URL}/people`).pipe(
      tap((result: PeopleDTO[]) => {
        const values: PeopleDTO[] = result ?? initialValue;
        this._items.set(values)
      })
    )
  }

  private getFromApi(url: string): Observable<PeopleDTO[]>{
    return this.http.get<PeopleResultDTO>(url).pipe(map(response => response.results))
  }

}
