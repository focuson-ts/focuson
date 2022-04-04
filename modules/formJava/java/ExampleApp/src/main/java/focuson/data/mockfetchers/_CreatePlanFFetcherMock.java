package focuson.data.mockfetchers;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import focuson.data.fetchers._CreatePlanFFetcher;
import focuson.data.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class _CreatePlanFFetcherMock  implements _CreatePlanFFetcher{
 public DataFetcher getCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
 public DataFetcher createCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
 public DataFetcher updateCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
 public DataFetcher deleteCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
 public DataFetcher listCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }
}