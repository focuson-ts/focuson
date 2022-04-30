package focuson.data.fetchers.JointAccount;

import graphql.schema.DataFetcher;
import java.util.Map;
import focuson.data.fetchers.IFetcher;

public interface pre_JointAccount_get_FFetcher extends IFetcher{
   public DataFetcher<Map<String,Object>> getpreJointAccount();
}