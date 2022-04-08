package focuson.data.fetchers;

import graphql.schema.DataFetcher;

public interface PostCodeNameAndAddressFFetcher extends IFetcher{
   public DataFetcher createPostCodeNameAndAddress();
}