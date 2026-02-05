package it.project.animex_backend.dto;

import it.project.animex_backend.entity.RoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {

    private Long id;

    @NotBlank(message = "The username must not be null and must contain at least one non-whitespace character.")
    @Size(min = 4, max = 30, message = "Username must be 4-30 characters")
    private String username;


    @NotBlank(message = "The email must not be null and must contain at least one non-whitespace character.")
    @Email(message = "Email must be valid (user@example.com)")
    private String email;

    @NotBlank(message = "The password must not be null and must contain at least one non-whitespace character.")
    @Size(min = 8, max = 100, message = "Password must be 8-30 characters")
    private String password;

    private Long profileId;

    private RoleType role;

}
