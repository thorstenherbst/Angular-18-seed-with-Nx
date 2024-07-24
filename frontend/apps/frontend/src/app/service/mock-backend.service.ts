import { Injectable, signal, Signal } from '@angular/core';

export type Board = string[][];

@Injectable({
  providedIn: 'root'
})
export class MockBackendService{
  private board: Board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  constructor(){ }

  cellClicked(x: number, y: number, player: string): Signal<Board>{
    this.checkAvailability(x, y, player);
    return signal(JSON.parse(JSON.stringify(this.board)));
  }

  get newGame(): Signal<Board>{
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    return signal(JSON.parse(JSON.stringify(this.board)));
  }

  won(): string | undefined{
    // Checking rows
    for (let i = 0; i < 3; i++) {
      const a = this.board[ i ][ 0 ];
      const b = this.board[ i ][ 1 ];
      const c = this.board[ i ][ 2 ];
      if (a != '' && a === b && b === c) {
        return a;
      }
    }
    // Checking columns
    for (let i = 0; i < 3; i++) {
      const a = this.board[ 0 ][ i ];
      const b = this.board[ 1 ][ i ];
      const c = this.board[ 2 ][ i ];
      if (a != '' && a === b && b === c) {
        return a;
      }
    }
    // Left Top to Bottom right diagonal
    const a = this.board[ 0 ][ 0 ];
    const b = this.board[ 1 ][ 1 ];
    const c = this.board[ 2 ][ 2 ];
    if (a != '' && a === b && b === c) {
      return a;
    }
    // Right Top to Left bottom diagonal
    const d = this.board[ 0 ][ 2 ];
    const e = this.board[ 1 ][ 1 ];
    const f = this.board[ 2 ][ 0 ];
    if (d != '' && d === e && e === f) {
      return d;
    }
    // Check for draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = this.board[ i ][ j ];
        if (square === '') return undefined;
      }
    }
    return 'draw';
  }

  getWinningPoint(player: string): number[] | undefined{
    // Checking rows
    for (let i = 0; i < 3; i++) {
      const a = this.board[ i ][ 0 ];
      const b = this.board[ i ][ 1 ];
      const c = this.board[ i ][ 2 ];
      if (a === player && a === b && c === '') {
        return [i, 2];
      }
      if (c === player && c === b && a === '') {
        return [i, 0];
      }
    }
    // Checking columns
    for (let i = 0; i < 3; i++) {
      const a = this.board[ 0 ][ i ];
      const b = this.board[ 1 ][ i ];
      const c = this.board[ 2 ][ i ];
      if (a === player && a === b && c === '') {
        return [2, i];
      }
      if (c === player && c === b && a === '') {
        return [0, i];
      }
    }
    // Left Top to Bottom right diagonal
    const a = this.board[ 0 ][ 0 ];
    const b = this.board[ 1 ][ 1 ];
    const c = this.board[ 2 ][ 2 ];
    if (a === player && a === b && c === '') {
      return [2, 2];
    }
    if (c === player && c === b && a === '') {
      return [0, 0];
    }
    // Right Top to Left bottom diagonal
    const d = this.board[ 0 ][ 2 ];
    const e = this.board[ 1 ][ 1 ];
    const f = this.board[ 2 ][ 0 ];
    if (d === player && d === e && f === '') {
      return [2, 0];
    }
    if (f === player && f === e && d === '') {
      return [0, 2];
    }
    return undefined
  }

  checkAvailability(x: number, y: number, player: string){
    if(player !== 'X') return alert('Please start new game');
    if (this.board[ x ][ y ] !== '') return alert('Already occupied');
    this.board[ x ][ y ] = player;
    if (this.won()) return alert(this.won() !== 'draw' ? this.won() + ' Wins !!!': 'Draw !!');
    this.makeKIMove();
  }

  getRandPoint(): number[]{
    const y = Math.floor(Math.random()*3);
    const x = Math.floor(Math.random()*3);
    if (this.board[ y ][ x ] === '') {
      return [x, y]
    }
    return this.getRandPoint();
  }

  makeKIMove(){
    if (this.getWinningPoint('O')) {
      const [x, y]         = this.getWinningPoint('O')!;
      this.board[ x ][ y ] = 'O';
    } else if (!this.getWinningPoint('X')) {
      const [x, y]         = this.getRandPoint();
      this.board[ x ][ y ] = 'O';
    } else {
      const [x, y]         = this.getWinningPoint('X')!;
      this.board[ x ][ y ] = 'O';
    }
    if (this.won()) return alert(this.won() !== 'draw' ? this.won() + ' Wins !!!': 'Draw !!');
  }
}
