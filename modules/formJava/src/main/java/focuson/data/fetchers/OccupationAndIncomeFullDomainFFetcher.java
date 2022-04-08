package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface OccupationAndIncomeFullDomainFFetcher extends IFetcher{
   public DataFetcher getOccupationAndIncomeFullDomain();
   public DataFetcher updateOccupationAndIncomeFullDomain();
}