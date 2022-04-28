package focuson.data;
import graphql.GraphQL;
public interface IManyGraphQl {
    GraphQL get(String dbName);
}