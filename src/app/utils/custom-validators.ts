/*
import { AbstractControl } from "@angular/forms";

export class CustomValidators{
    static matchValues(toCompare: AbstractControl){
        return (control: AbstractControl) => {
            if(control.value !== toCompare.value) return { noMatch: true}
            return null
        }
    }
}
*/


import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static matchValues(toCompare: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!toCompare || !control) return null;

            // Actualiza el validador cuando cambia el valor del campo de comparación
            toCompare.valueChanges.subscribe(() => control.updateValueAndValidity());

            return control.value !== toCompare.value ? { noMatch: true } : null;
        };
    }
}

