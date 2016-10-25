import { Injectable } from '@angular/core';
import { AutocompleteParam } from './autocompleteParam';
import { Http, Headers } from '@angular/http';

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

  getAutocomplete(onSuccess?: (result?: any) => void, onFail?: (error?: any) => void): void {
    let self = this;
    self._http.get(this.url).subscribe(result => {
      if (onSuccess) onSuccess(result);
    }, error => {
      if (onFail) onFail(error);
    });
  }
}
