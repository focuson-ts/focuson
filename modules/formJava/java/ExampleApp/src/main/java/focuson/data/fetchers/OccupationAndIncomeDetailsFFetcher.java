package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface OccupationAndIncomeDetailsFFetcher {
   public DataFetcher getOccupationAndIncomeDetails();
   public DataFetcher updateOccupationAndIncomeDetails();
}