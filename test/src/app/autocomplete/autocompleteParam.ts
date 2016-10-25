export class AutocompleteParam {
    placeholder: string;
    url: string;
    hasGroupTitle: boolean;
}

// export class AutocompleteParam implements IAutocomplete {
//     placeholder: string;
//     url: string;
//     hasGroupTitle: boolean;

//     constructor(param?: IAutocomplete){
//         if (!param) return;
//         this.placeholder = param.placeholder;
//         this.url = param.url;
//         this.hasGroupTitle = param.hasGroupTitle;
//     }
// }