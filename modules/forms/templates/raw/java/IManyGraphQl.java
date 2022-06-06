package {thePackage}.{utilsPackage};

import graphql.GraphQL;

public interface IManyGraphQl {
    GraphQL get(String dbName);
}
