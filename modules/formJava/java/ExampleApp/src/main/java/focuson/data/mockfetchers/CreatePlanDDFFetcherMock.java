package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers.CreatePlanDDFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class CreatePlanDDFFetcherMock  implements CreatePlanDDFFetcher{
 public DataFetcher getCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher createCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher updateCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher deleteCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher listCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
}