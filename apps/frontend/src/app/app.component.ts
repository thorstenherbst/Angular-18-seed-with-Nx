import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ApiService } from '@frontend/api';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from '@angular/common';
import { PeopleDTO } from '../../../../libs/api/src/lib/people';

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, NxWelcomeComponent, RouterModule, NgForOf, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  service: ApiService = inject(ApiService);
  title = 'frontend';
  apiService = inject(ApiService);
  people: Signal<PeopleDTO[]> = computed(() =>
    this.apiService.items() ? this.apiService.items() : []);
  tableHeader: string[] = ['']
  /*
  * Uncomment this to see weather the ApiService works
  *
  * */
  constructor(){
    effect(() => {
      this.createTableHeader();
    })
  }
  ngOnInit(){
    this.apiService.getAll().subscribe();
  }
  createTableHeader(){
    if(this.people()?.length){
      this.tableHeader = Object.keys(this.people()[0]);
    }
  }
  getColumns(row: PeopleDTO){
    return Object.keys(row)
  }
}

