package {thePackage}.{utilsPackage};
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.GraphQLError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
public class Messages{
    public final List<String> error=new ArrayList<>(2);
    public final List<String> info=new ArrayList<>(2);
    public final List<String> warning=new ArrayList<>(2);
    public final Map<String, Object> map = new HashMap<>();
    public Messages(){
        map.put("error", error);
        map.put("info", info);
        map.put("warning", warning);
    }
    public void info(String s) { if (s != null && s.length() > 0) info.add(s) ;}
    public void warning(String s) { if (s != null && s.length() > 0) warning.add(s) ;}
    public void error(String s) { if (s != null && s.length() > 0) error.add(s) ;}
}