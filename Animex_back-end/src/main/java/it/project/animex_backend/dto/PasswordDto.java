package it.project.animex_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordDto {

    String oldPassword;

    @NotBlank(message = "The new password must not be null and must contain at least one non-whitespace character.")
    @Size(min = 8, max = 100, message = "The new password must be 8-30 characters")
    String newPassword;
}
