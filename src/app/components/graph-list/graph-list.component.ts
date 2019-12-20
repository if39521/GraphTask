import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewEncapsulation } from '@angular/core';
import { PeopleWitBMI } from 'src/app/models/people';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphListComponent  {

  @HostBinding('class') classes = 'graph-list';
  @Input() groupedPeople: PeopleWitBMI[];
  @Input() columnName: string;


  public getBackgroundColorByBMI(person: PeopleWitBMI) {
    let backgroundColor: string;

    switch (true) {
      case person.BMI < 16:
        backgroundColor = 'black';
        break;
      case person.BMI >= 16 && person.BMI < 25:
        backgroundColor = 'green';
        break;
      case person.BMI >= 25 && person.BMI < 40:
        backgroundColor = 'orange';
        break;
      case person.BMI > 40:
        backgroundColor = 'red';
        break;
      default:
        backgroundColor = 'black';
        break;
    }
    return backgroundColor;
  }
}
