package {thePackage};

import graphql.GraphQL;

public interface IManyGraphQl {
    GraphQL get(String dbName);
}
