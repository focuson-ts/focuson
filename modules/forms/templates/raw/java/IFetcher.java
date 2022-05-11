package {thePackage}.fetchers;

import graphql.schema.DataFetcher;

public interface IFetcher {
    String dbName();

    static String mock = "mock";
    static String db = "db";
}
