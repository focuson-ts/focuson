package focuson.data.fetchers.ETransfer;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface ETransferDataD_create_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> createETransferDataD();
}