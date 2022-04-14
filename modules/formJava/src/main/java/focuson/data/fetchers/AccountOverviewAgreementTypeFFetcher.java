package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface AccountOverviewAgreementTypeFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAccountOverviewAgreementType();
}