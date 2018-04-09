import { Component, OnInit } from '@angular/core';
import {Person} from '../shared/person';
import {PersonService} from '../shared/person.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  searchTerm = '';
  persons: Person[] = [];

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
  }

  search() {
    this.personService.search(this.searchTerm).subscribe(
      (data) => {
        console.log(data);
        this.persons = data;
      }
    );
  }

}
