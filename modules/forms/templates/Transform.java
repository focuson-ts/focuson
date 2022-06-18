package {thePackage}.{controllerPackage};

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

class Messages{
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

public class Transform {

    public static Messages msgs(){return new Messages();}

    public static ResponseEntity<String> result(Connection connection,GraphQL graphQL, String query, String result, Messages msgs) throws JsonProcessingException {
        ExecutionInput executionInput = ExecutionInput.newExecutionInput().query(query).localContext(connection).build();
        ExecutionResult executionResult = graphQL.execute(executionInput);
        List<GraphQLError> errors = executionResult.getErrors();
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("x-query", query);
        if (errors.isEmpty()) {
            Map rawData = (Map) executionResult.toSpecification().get("data");
            Object data =  result.length()==0 ? rawData:rawData.get(result);
            Map res = new HashMap();
            res.put("data", data);
            res.put("messages", msgs.map);
            return new ResponseEntity(res, responseHeaders, HttpStatus.OK);
        }
        String body = new ObjectMapper().writeValueAsString(errors);
        return new ResponseEntity(body, responseHeaders, HttpStatus.BAD_REQUEST);
    }
    public static ObjectMapper mapper = new ObjectMapper();
    public static ObjectWriter prettyPrinter = mapper.writerWithDefaultPrettyPrinter();
    public static Pattern pattern = Pattern.compile("(?m)^\\s*\"[^\"]+\"");

    public static String removeQuoteFromProperties(String json, Class clazz) throws IOException {
        String pretty = prettyPrinter.writeValueAsString(mapper.readValue(json, clazz));
        StringBuilder result = new StringBuilder();
        Matcher matcher = pattern.matcher(pretty);
        int index = 0;
        while (matcher.find()) {
            int start = matcher.start();
            int end = matcher.end();
            String original = pretty.substring(index, start - 1);
            String replaceWith = pretty.substring(start + 1, end - 1).replace('"', ' ');
            result.append(original);
            result.append(replaceWith);
            index = end;
        }
        result.append(pretty.substring(index));
        return result.toString();
    }
}