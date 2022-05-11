package focuson.data.fetchers.LinkedAccountDetails;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface MandateList_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getMandate();
}