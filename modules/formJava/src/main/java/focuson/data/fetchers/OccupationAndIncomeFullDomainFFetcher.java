package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface OccupationAndIncomeFullDomainFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getOccupationAndIncomeFullDomain();
   public DataFetcher<Map<String,Object>> updateOccupationAndIncomeFullDomain();
}