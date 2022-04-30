package focuson.data.mockfetchers.JointAccount;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.IFetcher;
import focuson.data.fetchers.JointAccount.pre_JointAccount_get_FFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class pre_JointAccount_get_FFetcherMock  implements pre_JointAccount_get_FFetcher{
@Override
public String dbName() {return IFetcher.mock; }
 public DataFetcher getpreJointAccount() {  return dataFetchingEnvironment -> Sample.sampleJointAccount0;    }
}