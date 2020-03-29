import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { PersonService } from './services/person.service';
import { Person } from './person';

@Injectable()
export class PersonDetailResolver implements Resolve<Person> {
  constructor(private personService: PersonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Person> {
    let id = route.paramMap.get('person-id');
    console.log('Resolving for person id:' + id);
    
    return this.personService.getPerson(id).then(person => {
      if (person) {
        return person;
      } else {
        this.router.navigate(['/person/personList']);
        console.log('No Data Found for Person Id :'+id);
        return null;
      }
    });
  }
} 