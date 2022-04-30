package focuson.data.fetchers.PostCodeMainPage;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface PostCodeNameAndAddress_create_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> createPostCodeNameAndAddress();
}