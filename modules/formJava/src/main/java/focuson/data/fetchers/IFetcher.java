package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface IFetcher {
    String dbName();

    static String mock = "mock";
    static String h2 = "h2";
}
