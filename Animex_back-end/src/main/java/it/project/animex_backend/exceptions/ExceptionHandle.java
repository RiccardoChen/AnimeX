package it.project.animex_backend.exceptions;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ExceptionHandle {

    // eccezioni per elementi non trovati, mancanza di un campo che non deve essere null, mancanda di inserimento dell'id
    @ExceptionHandler({
            NoSuchElementException.class,
            NullPointerException.class,
            IllegalArgumentException.class})
    public ResponseEntity<ErrorMessage> entityNonFound(RuntimeException e){
        HttpStatus status = determineHttpStatus(e);
        final ErrorMessage errorMessage = ErrorMessage.builder()
                .message(e.getMessage())
                .timeStamp(Instant.now())
                .build();

        return ResponseEntity.status(status).body(errorMessage);
    }

    // Database error

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorMessage> sqlError(SQLException e) {
        final ErrorMessage errorMessagge = ErrorMessage.builder()
                .message(e.getMessage())
                .timeStamp(Instant.now())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessagge);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> validationException(MethodArgumentNotValidException e) {

        List<String> errorList = e.getBindingResult().getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();


        final ErrorMessage errorMessage = ErrorMessage.builder()
                .message(String.join("| ", errorList))
                .timeStamp(Instant.now())
                .build();


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }





    private HttpStatus determineHttpStatus(RuntimeException e) {
        return switch (e) {
            case NoSuchElementException noSuchElementException -> HttpStatus.NOT_FOUND;
            case IllegalArgumentException illegalArgumentException -> HttpStatus.BAD_REQUEST;
            case NullPointerException nullPointerException -> HttpStatus.INTERNAL_SERVER_ERROR;
            case null, default ->
                // Default status if not matched
                    HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }
}
