import { Component } from '@angular/core';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){}
  data = { "title":['abc','dec','des','aaa'],"compy":['456','123','789']};
  data2=["123","qss","wqqwqq"];
}
