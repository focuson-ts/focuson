package focuson.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.GraphQLError;

import java.util.List;
import java.util.Map;

public class Results {
    public static String result(GraphQL graphQL, String query, String result) throws JsonProcessingException {
        ExecutionResult executionResult = graphQL.execute(query);
        List<GraphQLError> errors = executionResult.getErrors();
        if (errors.isEmpty()) {
            Map data = (Map) executionResult.toSpecification().get("data");
            return new ObjectMapper().writeValueAsString(data.get(result));
        }
        return new ObjectMapper().writeValueAsString(errors);

    }
}