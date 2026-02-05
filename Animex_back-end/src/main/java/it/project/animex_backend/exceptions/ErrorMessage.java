package it.project.animex_backend.exceptions;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class ErrorMessage {

    private String message;
    private Instant timeStamp;

    public ErrorMessage(final String message, final Instant timeStamp) {
        this.message = message;
        this.timeStamp = timeStamp;
    }

}
