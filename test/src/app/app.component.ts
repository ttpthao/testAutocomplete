import { Component } from '@angular/core';
import { CompleterService, CompleterData } from './lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private searchStr: string;
  private dataService: CompleterData;
  private searchData = [
    { color: 'red', value: '#f00', category: 'light' },
    { color: 'green', value: '#0f0', category: 'light' },
    { color: 'blue', value: '#00f', category: 'light' },
    { color: 'magenta', value: '#f0f', category: 'light' },
    { color: 'yellow', value: '#ff0', category: 'light' },
    { color: 'bagenta', value: '#f0f', category: 'light' },
    { color: 'byan', value: '#0ff', category: 'dark' },
    { color: 'grey', value: '#f0f', category: 'light' },
    { color: 'black', value: '#000', category: 'dark' },
    { color: 'cyan', value: '#0ff', category: 'dark' },
    { color: 'purple color tput', value: '#0ff', category: 'dark' },
  ];

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
  }
}
