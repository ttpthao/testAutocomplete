import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const noop = () => { };
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  // @Input() inputName: string;
  @Input() data = {};
  // @Input() placeholder: string;
  // @Input() maxChars: number;
  // @Input() disableInput: boolean;
  @Input() hasGroupTitle: boolean;

  // @Output() public selected = new EventEmitter<CompleterItem>();
  @Output() public blur = new EventEmitter<void>();

  public searchStr: string;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  constructor() { }

  ngOnInit() {
  }
  public onTouched() {
    this._onTouchedCallback();
  }

  public writeValue(value: any) {
    this.searchStr = value;
  }

  public registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  public onBlur() {
    this.blur.emit();
    this.onTouched();
  }

  public convertArray(array) {
    var newArray = [];
    for (var name in array) {
      var list = array[name];
    }
  }


}
