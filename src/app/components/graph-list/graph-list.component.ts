import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewEncapsulation } from '@angular/core';
import { PeopleWitBMI } from 'src/app/models/people';
import { BmiBackgroundColor } from 'src/app/models/BmiBackgroundColor';

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
  @Input() columnName: BmiBackgroundColor;


  public getBackgroundColorByBMI(person: PeopleWitBMI): BmiBackgroundColor {
    let backgroundColor: BmiBackgroundColor;

    switch (true) {
      case person.BMI < 16:
        backgroundColor = BmiBackgroundColor.BLACK;
        break;
      case person.BMI >= 16 && person.BMI < 25:
        backgroundColor = BmiBackgroundColor.GREEN;
        break;
      case person.BMI >= 25 && person.BMI < 40:
        backgroundColor = BmiBackgroundColor.ORANGE;
        break;
      case person.BMI > 40:
        backgroundColor = BmiBackgroundColor.RED;
        break;
      default:
        backgroundColor = BmiBackgroundColor.BLACK;
        break;
    }
    return backgroundColor;
  }
}
