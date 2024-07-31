import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:    'app-item',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './item.component.html',
  styleUrl:    './item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() state: string = '';
  @Input() xPoint: number = 0;
  @Input() yPoint: number = 0;
  @Output('cellClicked') onClick: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.onClick.emit({x: this.xPoint, y: this.yPoint})
  }

}
