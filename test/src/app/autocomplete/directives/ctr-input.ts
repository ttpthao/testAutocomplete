import { Directive, EventEmitter, Host, HostListener, Input, Output } from "@angular/core";

import { CompleterItem } from "../autocompleteItem";
import { CtrCompleter } from "./ctr-completer";


// keyboard events
const KEY_DW = 40;
const KEY_RT = 39;
const KEY_UP = 38;
const KEY_LF = 37;
const KEY_ES = 27;
const KEY_EN = 13;
const KEY_TAB = 9;

@Directive({
    selector: "[ctrInput]",
})
export class CtrInput {
    @Input("clearSelected") public clearSelected = false;
    @Input("overrideSuggested") public overrideSuggested = false;
    @Output() public ngModelChange: EventEmitter<any> = new EventEmitter()

    private _searchStr = "";
    private _displayStr = "";

    constructor( @Host() private completer: CtrCompleter) {
        this.completer.selected.subscribe((item: CompleterItem) => {
            if (this.clearSelected) {
                this.searchString = "";
            } else {
                this.searchString = item.title;
            }
            this.ngModelChange.emit(this.searchString);
        });
        this.completer.highlighted.subscribe((item: CompleterItem) => {
            this._displayStr = item.title;
            this.ngModelChange.emit(item.title);
        });
    }

    @HostListener("input", ["$event"])
    public onInputChange(event: any) {
        this.searchString = event.target.value;
    }

    @HostListener("keyup", ["$event"])
    public keyupHandler(event: any) {

        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }

        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();

            this.completer.search(this.searchString);
        }
        else if (event.keyCode === KEY_ES) {
            this._searchStr = this._displayStr;
            this.completer.clear();
        }
        else {
            if (!this.searchString) {
                this.completer.clear();
                return;
            }

            this.completer.search(this.searchString);
        }

    }

    @HostListener("keydown", ["$event"])
    public keydownHandler(event: any) {

        if (event.keyCode === KEY_EN) {
            this.completer.selectCurrent();
        } else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.nextRow();
        } else if (event.keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        } else if (event.keyCode === KEY_TAB) {
            if (this.overrideSuggested) {
                this.completer.onSelected({ title: this.searchString });
            } else {
                this.completer.selectCurrent();
            }
        } else if (event.keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
        }
    }

    @HostListener("blur", ["$event"])
    public onBlur(event: any) {
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchString});
        } else {
            setTimeout(
                () => {
                    this.completer.clear();
                },
                200
            );

        }
    }

    public get searchString() {
        return this._searchStr;
    }

    public set searchString(term: string) {
        this._searchStr = term;
        this._displayStr = term;
    }
}
