import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { PeopleDTO } from '../../../../apps/frontend/src/app/models/people';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private items: BehaviorSubject<PeopleDTO[]> = new BehaviorSubject([{uid: '', name: '', url: ''}]);
  private static BASE_URL = environment.baseUrl;

  getOne(id: string){
    return this.getFromApi(`${ApiService.BASE_URL}/people/${id}`)
  }
  public get items$(): Observable<PeopleDTO[]>{
    return this.items.asObservable();
  }
  private http = inject(HttpClient);

  public getAll(): Observable<PeopleDTO[]>{
    return this.getFromApi(`${ApiService.BASE_URL}/people`).pipe(
      tap((result: PeopleDTO[]) => {
        this.items.next(result || [])
        console.log('THX --> items',result);
      })
    )
  }

  private getFromApi(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(map(response => response['results']))
  }


}
