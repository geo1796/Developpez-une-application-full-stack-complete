import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
        return { uppercase: true };
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(value)) {
        return { lowercase: true };
    }

    // Check for at least one numerical character
    if (!/[0-9]/.test(value)) {
        return { numerical: true };
    }

    // Check for at least one special character
    if (!/[@$!%*?&]/.test(value)) {
        return { special: true };
    }

    // If all validation rules pass, return null
    return null;
}
