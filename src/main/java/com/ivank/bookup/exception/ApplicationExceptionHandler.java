package com.ivank.bookup.exception;

import com.ivank.bookup.exception.dto.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = UserWithUsernameAlreadyExistsException.class)
    protected ResponseEntity<Object> handleUserWithUsernameAlreadyExistsException(
            UserWithUsernameAlreadyExistsException exception,
            WebRequest request
    ) {
        String message = "This username is already taken! Please try something else.";
        ErrorResponse error = new ErrorResponse(message);
        return handleExceptionInternal(
                exception,
                error,
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST,
                request
        );
    }

    @ExceptionHandler(value = UserWithEmailAlreadyExistsException.class)
    protected ResponseEntity<Object> handleUserWithEmailAlreadyExistsException(
            UserWithEmailAlreadyExistsException exception,
            WebRequest request
    ) {
        String message = "User with given email is already registered!";
        ErrorResponse error = new ErrorResponse(message);
        return handleExceptionInternal(
                exception,
                error,
                new HttpHeaders(),
                HttpStatus.BAD_REQUEST,
                request
        );
    }
}
