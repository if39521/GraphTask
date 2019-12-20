import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Person } from 'src/app/models/people';

@Component({
  selector: 'app-graph-item',
  templateUrl: './graph-item.component.html',
  styleUrls: ['./graph-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphItemComponent  {

  @Input() person: Person;
  @Input() backgroundColor: string;

}
