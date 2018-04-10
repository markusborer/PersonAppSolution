import {Component, OnInit, ViewChild} from '@angular/core';
import {Person} from '../shared/person';
import {PersonService} from '../shared/person.service';
import {Observable} from 'rxjs/Observable';
import {LoadingStatus} from '../shared/loading-status.enum';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  LoadingStatus = LoadingStatus;
  searchTerm = '';
  persons: Person[] = [];
  @ViewChild('searchForm') form;
  status: LoadingStatus;

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.form.control.valueChanges
      .debounceTime(200)
      .do(() => {
        this.persons = [];
        this.status = LoadingStatus.LOADING;
      })
      .switchMap(s => this.personService.search(this.searchTerm)
        .catch(error => {
          console.log(error);
          this.status = LoadingStatus.ERROR;
          return Observable.of(undefined);
        })
      )
      .subscribe(
        data => {
          if (data !== undefined) {
            console.log(data);
            this.persons = data;
            this.status = LoadingStatus.LOADED;
          }
        }
      )
    ;
  }

}
