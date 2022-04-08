package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface IFetcher {
    DataFetcher fetcher();

    String dbName();

    static String mock = "mock";
}
