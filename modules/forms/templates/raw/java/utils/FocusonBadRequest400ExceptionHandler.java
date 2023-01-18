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
public class FocusonBadRequest400ExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(FocusonBadRequest400Exception.class)
    public ResponseEntity<Object> handleExceptions(FocusonBadRequest400Exception exception, WebRequest webRequest) {
        ResponseEntity<Object> entity = new ResponseEntity<>(exception.msgs.withEmptyData(),  HttpStatus.BAD_REQUEST);
        return entity;
    }
}