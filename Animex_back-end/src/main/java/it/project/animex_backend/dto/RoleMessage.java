package it.project.animex_backend.dto;

import it.project.animex_backend.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleMessage {

    private RoleType role;
    private Instant timeStamp;
}
