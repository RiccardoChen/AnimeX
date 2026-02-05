package it.project.animex_backend.dto;

import jakarta.transaction.Status;
import jdk.jshell.Snippet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    private String message;
    private HttpStatus status;
    private Instant timeStamp;
}
