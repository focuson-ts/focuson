package focuson.data.fetchers;

import graphql.schema.DataFetcher;

import java.util.Map;
import java.util.Optional;

public interface JointAccountFFetcher extends IFetcher{
   public DataFetcher<Optional<Map<String,Object>>> getJointAccount();
}