import { Component, inject, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgForOf, NgIf } from '@angular/common';
import { ApiService, Board } from '@frontend/api';
import { ItemComponent } from './item/item.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NgForOf, NgIf, ItemComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tttgame';
  public board: Signal<Board | undefined> = signal(undefined);
  service: ApiService = inject(ApiService);
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
