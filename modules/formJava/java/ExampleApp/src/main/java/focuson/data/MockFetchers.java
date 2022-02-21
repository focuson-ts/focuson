package focuson.data;
import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Component
public class MockFetchers  implements FFetcher{
     public DataFetcher createOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
 public DataFetcher updateOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
 public DataFetcher getOccupationAndIncome() {  return dataFetchingEnvironment -> Sample.sampleOccupationAndIncome0;    }
 public DataFetcher getCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher createCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher updateCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher deleteCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher listCreatePlanDD() {  return dataFetchingEnvironment -> Sample.sampleCreatePlanDD0;    }
 public DataFetcher getEAccountsSummaryDD() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummaryDD0;    }
 public DataFetcher createETransferDataD() {  return dataFetchingEnvironment -> Sample.sampleETransferDataD0;    }
 public DataFetcher createCreateEAccountDataDD() {  return dataFetchingEnvironment -> Sample.sampleCreateEAccountDataDD0;    }
  public DataFetcher getAccountSummaryDescription (){ return new StaticDataFetcher("This is a one line string");}
  public DataFetcher getTotalMonthlyCost (){ return new StaticDataFetcher("1000");}
  public DataFetcher getOneAccountBalance (){ return new StaticDataFetcher("9921");}
  public DataFetcher getCurrentAccountBalance (){ return new StaticDataFetcher("12321");}
}