import { Component } from '@angular/core';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteParam } from './autocomplete/autocompleteParam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
  public searchStr: string = "y";
  test: AutocompleteParam = { placeholder: "text", url: "http://localhost:47594/api/Jobs/autocomplete", hasGroupTitle: true };

}
