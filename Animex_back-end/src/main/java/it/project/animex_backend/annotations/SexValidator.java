package it.project.animex_backend.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SexValidator implements ConstraintValidator<SexValidation, String> {
    @Override
    public boolean isValid(final String sex, final ConstraintValidatorContext context) {

        context.disableDefaultConstraintViolation();

        if(!(sex.equalsIgnoreCase("male") || sex.equalsIgnoreCase("female") || sex.equalsIgnoreCase("undefined"))){

            context.buildConstraintViolationWithTemplate("Il sesso deve essere tra (male/female/undefined)")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
