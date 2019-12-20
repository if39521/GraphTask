import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Person, PeopleWitBMI, GroupPeopleBy } from '../models/people';
import { map, shareReplay, tap, take, toArray } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, forkJoin, } from 'rxjs';
import { sortByBirthDay, pattern } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly peopleEndpoint = 'people/?format=json';
  private groupedPeople: BehaviorSubject<PeopleWitBMI[][]> = new BehaviorSubject<PeopleWitBMI[][]>(null);

  public readonly groupedPeople$: Observable<PeopleWitBMI[][]> = this.groupedPeople.asObservable();
  constructor(private apiSrv: ApiService) { }

  public getPeople(filterPeopleBy: GroupPeopleBy[]): void {
    const people$ = this.apiSrv.get(this.peopleEndpoint).pipe(
      map(peopleResponse => peopleResponse.results),
      map(people => people.map(person => ({...person, BMI: this.calculateBMI(person)})  as PeopleWitBMI[])),
      map(peopleWithBMI => peopleWithBMI.sort(sortByBirthDay)),
      shareReplay()
    );

    const gruoupedPeople$ = this.groupPeople(people$, filterPeopleBy);
    gruoupedPeople$.subscribe();

  }

  private groupPeople(people$: Observable<PeopleWitBMI[]>, filterPeopleBy: GroupPeopleBy[]): Observable<PeopleWitBMI[][]> {
    const peopleWithUnknownBirth$ = people$.pipe(
      this.findPeopleWithUnkownBirth()
      );
    const peopleWithKnownBirth$ = combineLatest(filterPeopleBy
      .map(filterPeriod => people$.pipe(
           this.filterPeopleBetweenAges(filterPeriod.fromAge, filterPeriod.toAge)
           )
        )
      );

    const grouped$ = forkJoin(peopleWithKnownBirth$, peopleWithUnknownBirth$).pipe(
      take(1),
      map(([peopleWithKnownBirth, peopleWithoutKnownBirth]) => [...peopleWithKnownBirth, ...peopleWithoutKnownBirth] as PeopleWitBMI[][] ),
      tap(filteredPeople => this.groupedPeople.next(filteredPeople))
    );

    return grouped$;
  }

  private calculateBMI(person: Person): number {
    const heightInMeter: number = Number(person.height) / 100;
    const weight: number = Number(person.mass);

    return weight / Math.pow(heightInMeter, 2);
  }

  private personIsBetweenAges(person: Person, fromAge: number, toAge: number): boolean {
    const matchedBirthYear: RegExpMatchArray = person.birth_year.match(pattern);
    if (!matchedBirthYear) {return false; }
    const personBirthYear = Number(matchedBirthYear.join());

    return personBirthYear >= fromAge && personBirthYear <= toAge;
  }

  private findPeopleWithUnkownBirth() {
    return (src: Observable<PeopleWitBMI[]>) =>
    src.pipe(
      map(people => people.filter(person => person.birth_year === 'unknown')),
      toArray()
    );
  }

  private filterPeopleBetweenAges(fromAge: number, toAge: number) {
    return (src: Observable<PeopleWitBMI[]>) =>
    src.pipe(
      map(people => people.filter(person => this.personIsBetweenAges(person, fromAge, toAge)))
    );
  }
}
