package {thePackage}.{utilsPackage};

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;
@ControllerAdvice
public class FocusonNotFound404ExceptionHandling extends ResponseEntityExceptionHandler {
    @ExceptionHandler(FocusonNotFound404Exception.class)
    public ResponseEntity<Object> handleExceptions(FocusonNotFound404Exception exception, WebRequest webRequest) {
        Map res = new HashMap();
        res.put("messages", exception.msgs.map);
        ResponseEntity<Object> entity = new ResponseEntity<>(res,  HttpStatus.NOT_FOUND);
        return entity;
    }
}