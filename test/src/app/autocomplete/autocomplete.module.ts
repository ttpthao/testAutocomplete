import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { CtrCompleter } from './directives/ctr-completer';
import { CtrDropdown } from './directives/ctr-dropdown';
import { CtrInput } from './directives/ctr-input';
import { CtrRow } from './directives/ctr-row';

@NgModule({
  imports: [
    CommonModule,
    CtrCompleter,
    CtrDropdown,
    CtrInput,
    CtrRow
  ],
  providers: [
    ],
  declarations: [AutocompleteComponent]
})
export class AutocompleteModule { }
