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
  private gameEnd: string | undefined =  undefined;

  constructor(){ }

  cellClicked(board: Board, x: number, y: number, player: string): Signal<Board>{
    this.checkAvailability(board, x, y, player);
    return signal(JSON.parse(JSON.stringify(board)));
  }

  get newGame(): Signal<Board>{
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.gameEnd = undefined;
    return signal(JSON.parse(JSON.stringify(this.board)));
  }

  won(board: Board): string | undefined{
    // Checking rows
    for (let i = 0; i < 3; i++) {
      const a = board[ i ][ 0 ];
      const b = board[ i ][ 1 ];
      const c = board[ i ][ 2 ];
      if (a != '' && a === b && b === c) {
        this.gameEnd = a;
        return this.gameEnd;
      }
    }
    // Checking columns
    for (let i = 0; i < 3; i++) {
      const a = board[ 0 ][ i ];
      const b = board[ 1 ][ i ];
      const c = board[ 2 ][ i ];
      if (a != '' && a === b && b === c) {
        this.gameEnd = a;
        return this.gameEnd;
      }
    }
    // Left Top to Bottom right diagonal
    const a = board[ 0 ][ 0 ];
    const b = board[ 1 ][ 1 ];
    const c = board[ 2 ][ 2 ];
    if (a != '' && a === b && b === c) {
      this.gameEnd = a;
      return this.gameEnd;
    }
    // Right Top to Left bottom diagonal
    const d = board[ 0 ][ 2 ];
    const e = board[ 1 ][ 1 ];
    const f = board[ 2 ][ 0 ];
    if (d != '' && d === e && e === f) {
      return d;
    }
    // Check for draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = board[ i ][ j ];
        if (square === '') return undefined;
      }
    }
    return 'draw';
  }

  getWinningPoint(board: Board, player: string): number[] | undefined {
    // Checking rows
    for (let i = 0; i < 3; i++) {
      const a = board[ i ][ 0 ];
      const b = board[ i ][ 1 ];
      const c = board[ i ][ 2 ];
      if (a === player && a === b && c === '') {
        return [i, 2];
      }
      if (c === player && c === b && a === '') {
        return [i, 0];
      }
    }
    // Checking columns
    for (let i = 0; i < 3; i++) {
      const a = board[ 0 ][ i ];
      const b = board[ 1 ][ i ];
      const c = board[ 2 ][ i ];
      if (a === player && a === b && c === '') {
        return [2, i];
      }
      if (c === player && c === b && a === '') {
        return [0, i];
      }
    }
    // Left Top to Bottom right diagonal
    const a = board[ 0 ][ 0 ];
    const b = board[ 1 ][ 1 ];
    const c = board[ 2 ][ 2 ];
    if (a === player && a === b && c === '') {
      return [2, 2];
    }
    if (c === player && c === b && a === '') {
      return [0, 0];
    }
    // Right Top to Left bottom diagonal
    const d = board[ 0 ][ 2 ];
    const e = board[ 1 ][ 1 ];
    const f = board[ 2 ][ 0 ];
    if (d === player && d === e && f === '') {
      return [2, 0];
    }
    if (f === player && f === e && d === '') {
      return [0, 2];
    }
    return undefined
  }

  checkAvailability(board: Board, x: number, y: number, player: string){
    if(player !== 'X' || this.gameEnd !== undefined) return alert('Please start new game');
    if(board[ x ][ y ] !== '') return alert('Already occupied');
    board[ x ][ y ] = player;
    if (this.won(board)) return alert(this.won(board) !== 'draw' ? this.won(board) + ' Wins !!!': 'Draw !!');
    this.makeKIMove(board);
  }

  getRandPoint(board: Board): number[]{
    const y = Math.floor(Math.random()*3);
    const x = Math.floor(Math.random()*3);
    if(board[ y ][ x ] === '') {
      return [x, y];
    }
    return this.getRandPoint(board);
  }

  makeKIMove(board: Board){
    if (this.getWinningPoint(board,'O')) {
      const [x, y]         = this.getWinningPoint(board,'O')!;
      board[ x ][ y ] = 'O';
    } else if (!this.getWinningPoint(board,'X')) {
      const [x, y]         = this.getRandPoint(board);
      board[ x ][ y ] = 'O';
    } else {
      const [x, y]         = this.getWinningPoint(board,'X')!;
      board[ x ][ y ] = 'O';
    }
    if (this.won(board)) return alert(this.won(board) !== 'draw' ? this.won(board) + ' Wins !!!': 'Draw !!');
  }
}
