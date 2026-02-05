import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace: boolean = (control.value || '').trim().length === 0;
  return isWhitespace ? { whitespace: true } : null;
}
