package focuson.data.fetchers.AccountOverview;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface AccountOverviewAgreementType_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getAccountOverviewAgreementType();
}