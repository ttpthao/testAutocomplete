import { Injectable } from '@angular/core';
import { AutocompleteParam } from './autocompleteParam';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutocompleteService {
  public url: string = "";
  private headers: Headers;

  constructor(private _http: Http, private _param: AutocompleteParam) {
    this.url = _param.url;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  getAutocomplete() {
    return this._http.get(this.url);
  }
}
