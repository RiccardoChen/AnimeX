package it.project.animex_backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnimeDto {

    private Long id;

    @NotBlank(message = "The name of anime must not be null and must contain at least one non-whitespace character.")
    private String name;

    @Pattern(
            regexp = "^[a-zA-Z\\-,]+(?:\\s+[a-zA-Z\\-,]+)*$",
            message = "Category must be comma-separated words (e.g., 'Action, Fantasy, Sci-Fi')"
    )
    private String category;

    @Min(value = 1, message = "Episode must be ≥1")
    @Digits(integer = 4, fraction = 0, message = "Episode must be a whole number")
    private int episode;

    @Size(min = 3, message = "Description must be alteast 3 characters")
    private String description;

    private int year;

    private String img;

    private String video;

    private List<Long> profileIds;

}
