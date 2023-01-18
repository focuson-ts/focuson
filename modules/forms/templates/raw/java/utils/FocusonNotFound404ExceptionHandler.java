package {thePackage}.{utilsPackage};

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.core.Ordered;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class FocusonNotFound404ExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(FocusonNotFound404Exception.class)
    public ResponseEntity<Object> handleExceptions(FocusonNotFound404Exception exception, WebRequest webRequest) {
        ResponseEntity<Object> entity = new ResponseEntity<>(exception.msgs.withEmptyData(),  HttpStatus.NOT_FOUND);
        return entity;
    }
}