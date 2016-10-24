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
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
  }
}
