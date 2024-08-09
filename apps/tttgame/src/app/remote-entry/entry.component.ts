import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tttgame-entry',
  template: `<h1>Entry Components</h1>`,
})
export class RemoteEntryComponent {}
