import { PeopleWitBMI, Person } from '../models/people'

export const pattern: RegExp = /[+-]?\d+(\.\d+)?/g;

export const sortByBirthDay = (previousPerson: PeopleWitBMI, nextPerson: PeopleWitBMI) => {
  const previousPersonMatchedBirthYear = previousPerson.birth_year.match(pattern);
  const nextPersonMatchedBirthYear = nextPerson.birth_year.match(pattern);
  if (!previousPersonMatchedBirthYear || !nextPersonMatchedBirthYear) {
    return 0;
  }
  const previousPersonBirthYear = Number(previousPersonMatchedBirthYear.join());
  const nextPersonBirthYear = Number(nextPersonMatchedBirthYear.join());

  return previousPersonBirthYear  < nextPersonBirthYear ? -1 :
    previousPersonBirthYear > nextPersonBirthYear ? 1 : 0;
}

export const calculateBMI = (person: Person): number => {
  const heightInMeter: number = Number(person.height) / 100;
  const weight: number = Number(person.mass);

  return weight / Math.pow(heightInMeter, 2);
}