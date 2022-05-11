package focuson.data.fetchers.ListOfPaymentsPage;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface PrintRecordHistory_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getPrintRecordItem();
}