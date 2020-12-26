import { AbstractControl, ValidatorFn } from '@angular/forms';

export function uniqueValueValidator(valueList: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const isNotUnique = valueList.includes(control.value);
        return isNotUnique ? {notUnique: {value: control.value}} : null;
      };
}
