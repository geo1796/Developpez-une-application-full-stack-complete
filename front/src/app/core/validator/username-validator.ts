import { AbstractControl, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const username = control.value;
    if (!username || username.length < 3) {
      return { minlength: true };
    }
    if (!/^[a-zA-Z]+$/.test(username)) {
      return { pattern: true };
    }
    return null;
  };
}
