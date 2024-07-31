import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ApiService } from '@frontend/api';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, NxWelcomeComponent, RouterModule, NgForOf, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  service: ApiService = inject(ApiService);
  title = 'frontend';
  apiService = inject(ApiService);
  /*
  * Uncomment this to see weather the ApiService works
  * people = computed(() => this.apiService.items() ? this.apiService.items() : [])
  * */
  ngOnInit(){}
}

