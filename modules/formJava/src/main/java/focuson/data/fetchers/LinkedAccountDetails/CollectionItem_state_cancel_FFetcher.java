package focuson.data.fetchers.LinkedAccountDetails;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface CollectionItem_state_cancel_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> stateCollectionItemcancel();
}