import { Component, inject, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ApiService } from '@frontend/api';
import { CommonModule } from '@angular/common';

@Component({
  standalone:  true,
  imports:     [NxWelcomeComponent, RouterModule, CommonModule],
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrl:    './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'frontend';
  apiService = inject(ApiService);
  /*
  * Uncomment this to see weather the ApiService works
  * people = computed(() => this.apiService.items() ? this.apiService.items() : [])
  * */
  ngOnInit(){
     this.apiService.getAll().subscribe();
  }
}
