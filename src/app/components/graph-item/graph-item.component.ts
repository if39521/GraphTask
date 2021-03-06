import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Person } from 'src/app/models/people';
import { BmiBackgroundColor } from 'src/app/models/BmiBackgroundColor';

@Component({
  selector: 'app-graph-item',
  templateUrl: './graph-item.component.html',
  styleUrls: ['./graph-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphItemComponent  {

  @Input() person: Person;
  @Input() backgroundColor: BmiBackgroundColor;

}
