package focuson.data.fetchers;

import graphql.schema.DataFetcher;
import java.util.Map;

public interface pre_JointAccountFFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getpreJointAccount();
}