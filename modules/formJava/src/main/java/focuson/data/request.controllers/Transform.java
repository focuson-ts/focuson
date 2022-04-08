package focuson.data.request.controllers;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.GraphQLError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
public class Transform {
    public static ResponseEntity<String> result(GraphQL graphQL, String query, String result) throws JsonProcessingException {
        ExecutionResult executionResult = graphQL.execute(query);
        List<GraphQLError> errors = executionResult.getErrors();
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("x-query", query);
        if (errors.isEmpty()) {
            Map data = (Map) executionResult.toSpecification().get("data");
            String body = new ObjectMapper().writeValueAsString(data.get(result));
            return new ResponseEntity(body, responseHeaders, HttpStatus.OK);
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