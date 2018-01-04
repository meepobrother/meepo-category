import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[isOn]' })
export class IsOnDirective {
    @Output() isOnChange: EventEmitter<any> = new EventEmitter();
    @Input()
    set isOn(val: boolean) {
        if(val){
            this.isOnChange.emit();
        }
    }
    constructor() { }
}