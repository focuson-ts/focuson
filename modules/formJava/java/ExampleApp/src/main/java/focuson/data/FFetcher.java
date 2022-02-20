package focuson.data;

import graphql.schema.DataFetcher;

public interface FFetcher {
   public DataFetcher createOccupationAndIncome();
   public DataFetcher updateOccupationAndIncome();
   public DataFetcher listOccupationAndIncome();
   public DataFetcher getCreatePlanDD();
   public DataFetcher createCreatePlanDD();
   public DataFetcher updateCreatePlanDD();
   public DataFetcher deleteCreatePlanDD();
   public DataFetcher listCreatePlanDD();
   public DataFetcher getEAccountsSummaryDD();
   public DataFetcher createETransferDataD();
   public DataFetcher getAccountSummaryDescription();
   public DataFetcher getTotalMonthlyCost();
   public DataFetcher getOneAccountBalance();
   public DataFetcher getCurrentAccountBalance();
}