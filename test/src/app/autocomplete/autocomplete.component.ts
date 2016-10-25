import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { CompleterItem } from './autocompleteItem';
import { AutocompleteService } from './autocomplete.service';
import { AutocompleteParam } from './autocompleteParam';
import { Http } from '@angular/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const noop = () => { };
const COMPLETER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [AutocompleteService, COMPLETER_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements OnInit {
  @Input() param: AutocompleteParam;
  @Output() public blur = new EventEmitter<void>();
  @Output() public ngModelChange: EventEmitter<any> = new EventEmitter()
  private _results = [];
  private _searchString: string = '';
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private isInitialized: boolean = false;
  private _isRequesting: boolean = false;
  private _latestRequestString: string = '';

  constructor(private _autocompleteService: AutocompleteService) {
  }

  ngOnInit() {
  }

  public registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  public writeValue(value: any) {
    this._searchString = value;
  }

  public onBlur() {
    let self = this;
    setTimeout(function () {
      self.isInitialized = false;
    }, 200);
  }

  protected convertArray(array) {
    var newArray = [];
    for (var name in array) {
      var list = array[name];
      var categoryName = name.replace(/([A-Z])/g, ' $1').trim();
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      for (var value in list) {
        let newObject: CompleterItem = { title: list[value], category: categoryName }
        newArray.push(newObject)
      }
    }
    return newArray;
  }

  protected canShowCategory(list, item, index) {
    var firstIndex = 0;
    for (var i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]['category']) === JSON.stringify(item['category'])) {
        firstIndex = i;
        break;
      }
    }
    return firstIndex === index && this.param.hasGroupTitle;
  }
  protected selectItem(item) {
    this._searchString = item.replace(/<[^>]+>/ig, "");
    this.ngModelChange.emit(this._searchString);
    this.isInitialized = false;
  }
  protected changeValue() {
    let self = this;
    this.isInitialized = !!this._searchString;
    this.ngModelChange.emit(this._searchString);
    if (!this._isRequesting) {
      this._autocompleteService.url = this.param.url;
      this.search();
    }
  }
  private search() {
    let self = this;
    this._autocompleteService.getAutocomplete(this._searchString, this.beforeSend.bind(self), this.onSuccess.bind(self), this.onFail.bind(self));
  }
  private beforeSend() {
    this._isRequesting = true;
    this._latestRequestString = JSON.parse(JSON.stringify(this._searchString));
  }
  protected onFocus() {
    this.isInitialized = !!this._searchString;
  }

  private onSuccess(data) {
    this._isRequesting = false;
    this._results = this.convertArray(data);
    if (this._latestRequestString != this._searchString)
      this.search();
  }
  private onFail(error) {
    this._isRequesting = false;
    this._results = [];
  }
}
