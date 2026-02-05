package it.project.animex_backend.dto;

import it.project.animex_backend.annotations.SexValidation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDto {

    private Long id;

    @NotBlank(message = "The name of profile must not be null and must contain at least one non-whitespace character.")
    private String name;

    @SexValidation
    private String sex;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past(message = "Birthday must be a past date")
    private LocalDate birthday;

    private Long accountId;

    private List<Long> animeIds;
}
