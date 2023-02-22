import { AbstractControl, ValidatorFn } from "@angular/forms";

export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const emailRegExp: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
        const forbidden = !emailRegExp.test(control.value);
        return forbidden ? { invalidEmail: { value: control.value } } : null;
    };
}
