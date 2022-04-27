package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface PostCodeNameAndAddressFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> createPostCodeNameAndAddress();
}