package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface OccupationAndIncomeFFetcher {
   public DataFetcher createOccupationAndIncome();
   public DataFetcher updateOccupationAndIncome();
   public DataFetcher getOccupationAndIncome();
}