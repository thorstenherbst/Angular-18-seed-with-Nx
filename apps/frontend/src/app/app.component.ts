import { Component, effect, inject, OnInit, signal, Signal, untracked } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ApiService } from '@frontend/api';
import { ItemComponent } from './item/item.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Board } from './service/mock-backend.service';

@Component({
  standalone: true,
  imports: [NgIf, NxWelcomeComponent, RouterModule, ItemComponent, NgForOf, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  service: ApiService = inject(ApiService);
  public board: Signal<Board | undefined> = signal(undefined);

  title = 'frontend';
  cellClicked(ev: {x: number, y: number}): void {
    const board = this.board();
    if(!board) throw new Error('Can not find board, please try to start a new game!');
    const {x, y} = ev;
    this.board = this.service.changeGameStatus(board, x, y, 'X');
  }

  ngOnInit(){
    this.newGame();
  }

  newGame(){
    this.board = this.service.newGame();
  }
}

