import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PeopleService } from './services/people.service';
import { GroupPeopleBy } from './models/people';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private groupPeopleByAges: GroupPeopleBy[] = [
    {fromAge: 0, toAge: 20},
    {fromAge: 21, toAge: 40},
    {fromAge: 41, toAge: 60},
    {fromAge: 61, toAge: 80},
    {fromAge: 81, toAge: Infinity}
  ];
  public columnHeaders: string[] = ['0 - 20BBY', '21 - 40BBY', '41 - 60BBY', '61 - 80BBY', '81 + BBY', 'unknows'];
  constructor(public peopleSrv: PeopleService) {}

  ngOnInit(): void {
    this.peopleSrv.getPeople(this.groupPeopleByAges);
  }

}
