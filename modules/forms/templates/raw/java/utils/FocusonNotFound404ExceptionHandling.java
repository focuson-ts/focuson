package {thePackage}.{utilsPackage};

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@ControllerAdvice
public class FocusonNotFound404ExceptionHandling extends ResponseEntityExceptionHandler {
    @ExceptionHandler(FocusonNotFound404Exception.class)
    public ResponseEntity<Object> handleExceptions(FocusonNotFound404Exception exception, WebRequest webRequest) {
        ResponseEntity<Object> entity = new ResponseEntity<>(exception.msgs.emptyResult(),  HttpStatus.NOT_FOUND);
        return entity;
    }
}