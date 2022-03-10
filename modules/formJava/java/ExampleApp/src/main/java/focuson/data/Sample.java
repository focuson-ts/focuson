package focuson.data;
import java.util.Arrays;
import java.util.Map;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.json.JsonParser;
public class Sample{
    private static JsonParser parse = new JacksonJsonParser();
  public static Map sampleChequeCreditbooksDD0 =  parse.parseMap(
         "{"+
         "  \"history\": ["+
         "    {"+
         "      \"serialNumber\": 937453,"+
         "      \"howOrdered\": \"Manually\","+
         "      \"dateOrder\": \"2022-10-01\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleChequeCreditbooksHistoryDD0 =  parse.parseMap(
         "["+
         "  {"+
         "    \"serialNumber\": 937453,"+
         "    \"howOrdered\": \"Manually\","+
         "    \"dateOrder\": \"2022-10-01\""+
         "  }"+
         "]"
  );
  public static Map sampleChequeCreditbooksHistoryLineDD0 =  parse.parseMap(
         "{"+
         "  \"serialNumber\": 937453,"+
         "  \"howOrdered\": \"Manually\","+
         "  \"dateOrder\": \"2022-10-01\""+
         "}"
  );
  public static Map sampleCreateEAccountDataDD0 =  parse.parseMap(
         "{"+
         "  \"name\": \"This is a one line string\","+
         "  \"type\": \"checking\","+
         "  \"savingsStyle\": \"adHoc\","+
         "  \"initialAmount\": 123"+
         "}"
  );
  public static Map sampleCreatePlanDD0 =  parse.parseMap(
         "{"+
         "  \"createPlanStart\": \"2022-01-01\","+
         "  \"createPlanDate\": \"2022-03-01\","+
         "  \"createPlanEnd\": \"2022-10-01\""+
         "}"
  );
  public static Map sampleCustomerOccupationIncomeDetailsDD0 =  parse.parseMap(
         "["+
         "  {"+
         "    \"areYou\": \"C\","+
         "    \"currentEmployment\": \"N\","+
         "    \"occupation\": \"someString\","+
         "    \"customerDescription\": \"someString\","+
         "    \"ownShareOfTheCompany\": \"N\","+
         "    \"owningSharesPct\": \"N\","+
         "    \"workFor\": \"someString\","+
         "    \"employmentType\": \"1\","+
         "    \"annualSalaryBeforeDeduction\": 123,"+
         "    \"annualIncomeExcludingRent\": 123,"+
         "    \"regularCommissionBonus\": 123,"+
         "    \"dateOfEmploymentStart\": \"2020-10-01\","+
         "    \"otherSourceOfIncome\": \"N\","+
         "    \"createdBy\": \"someString\","+
         "    \"createdDate\": \"2020-10-01\","+
         "    \"employerName\": \"someString\","+
         "    \"whatTypeOfBusiness\": \"someString\","+
         "    \"whatNameBusiness\": \"someString\","+
         "    \"establishedYear\": \"2020-10-01\","+
         "    \"annualDrawing3Yrs\": 123,"+
         "    \"empStartDate\": \"2020-10-01\","+
         "    \"empEndDate\": \"2020-10-01\","+
         "    \"sePositionHeld\": \"someString\","+
         "    \"occupationCategory\": \"someString\","+
         "    \"empEmploymentSeq\": 123,"+
         "    \"empAppRoleSeq\": 123,"+
         "    \"accountantAppRoleSeq\": 123"+
         "  }"+
         "]"
  );
  public static Map sampleEAccountsSummaryDD0 =  parse.parseMap(
         "{"+
         "  \"useEStatements\": true,"+
         "  \"eAccountsTable\": ["+
         "    {"+
         "      \"accountId\": 1233450,"+
         "      \"displayType\": \"checking\","+
         "      \"description\": \"This account has a description\","+
         "      \"virtualBankSeq\": \"seq1\","+
         "      \"total\": 1000,"+
         "      \"frequency\": \"23\""+
         "    }"+
         "  ],"+
         "  \"totalMonthlyCost\": 1000,"+
         "  \"oneAccountBalance\": 9921,"+
         "  \"currentAccountBalance\": 12321,"+
         "  \"createPlan\": {"+
         "    \"createPlanStart\": \"2022-01-01\","+
         "    \"createPlanDate\": \"2022-03-01\","+
         "    \"createPlanEnd\": \"2022-10-01\""+
         "  }"+
         "}"
  );
  public static Map sampleEAccountsSummaryTableDD0 =  parse.parseMap(
         "["+
         "  {"+
         "    \"accountId\": 1233450,"+
         "    \"displayType\": \"checking\","+
         "    \"description\": \"This account has a description\","+
         "    \"virtualBankSeq\": \"seq1\","+
         "    \"total\": 1000,"+
         "    \"frequency\": \"23\""+
         "  }"+
         "]"
  );
  public static Map sampleEAccountSummaryDD0 =  parse.parseMap(
         "{"+
         "  \"accountId\": 1233450,"+
         "  \"displayType\": \"checking\","+
         "  \"description\": \"This account has a description\","+
         "  \"virtualBankSeq\": \"seq1\","+
         "  \"total\": 1000,"+
         "  \"frequency\": \"23\""+
         "}"
  );
  public static Map sampleETransferDataD0 =  parse.parseMap(
         "{"+
         "  \"account\": 1233450,"+
         "  \"dateOfETransfer\": \"2020-10-01\","+
         "  \"description\": \"Why we are doing this transfer\","+
         "  \"fromAccount\": 1233450,"+
         "  \"toAccount\": 1233450,"+
         "  \"monitoringAccount\": 1233450,"+
         "  \"type\": \"checking\","+
         "  \"balance\": 123,"+
         "  \"notes\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\""+
         "}"
  );
  public static Map sampleOccupationAndIncomeDetailsDD0 =  parse.parseMap(
         "{"+
         "  \"regulatoryReport\": \"someString\","+
         "  \"mainCustomerName\": \"someString\","+
         "  \"jointCustomerName\": \"someString\","+
         "  \"mainClientRef\": 123,"+
         "  \"jointClientRef\": 123,"+
         "  \"customerOccupationIncomeDetails\": ["+
         "    {"+
         "      \"areYou\": \"C\","+
         "      \"currentEmployment\": \"N\","+
         "      \"occupation\": \"someString\","+
         "      \"customerDescription\": \"someString\","+
         "      \"ownShareOfTheCompany\": \"N\","+
         "      \"owningSharesPct\": \"N\","+
         "      \"workFor\": \"someString\","+
         "      \"employmentType\": \"1\","+
         "      \"annualSalaryBeforeDeduction\": 123,"+
         "      \"annualIncomeExcludingRent\": 123,"+
         "      \"regularCommissionBonus\": 123,"+
         "      \"dateOfEmploymentStart\": \"2020-10-01\","+
         "      \"otherSourceOfIncome\": \"N\","+
         "      \"createdBy\": \"someString\","+
         "      \"createdDate\": \"2020-10-01\","+
         "      \"employerName\": \"someString\","+
         "      \"whatTypeOfBusiness\": \"someString\","+
         "      \"whatNameBusiness\": \"someString\","+
         "      \"establishedYear\": \"2020-10-01\","+
         "      \"annualDrawing3Yrs\": 123,"+
         "      \"empStartDate\": \"2020-10-01\","+
         "      \"empEndDate\": \"2020-10-01\","+
         "      \"sePositionHeld\": \"someString\","+
         "      \"occupationCategory\": \"someString\","+
         "      \"empEmploymentSeq\": 123,"+
         "      \"empAppRoleSeq\": 123,"+
         "      \"accountantAppRoleSeq\": 123"+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleOccupationIncomeDetailsDD0 =  parse.parseMap(
         "{"+
         "  \"areYou\": \"C\","+
         "  \"currentEmployment\": \"N\","+
         "  \"occupation\": \"someString\","+
         "  \"customerDescription\": \"someString\","+
         "  \"ownShareOfTheCompany\": \"N\","+
         "  \"owningSharesPct\": \"N\","+
         "  \"workFor\": \"someString\","+
         "  \"employmentType\": \"1\","+
         "  \"annualSalaryBeforeDeduction\": 123,"+
         "  \"annualIncomeExcludingRent\": 123,"+
         "  \"regularCommissionBonus\": 123,"+
         "  \"dateOfEmploymentStart\": \"2020-10-01\","+
         "  \"otherSourceOfIncome\": \"N\","+
         "  \"createdBy\": \"someString\","+
         "  \"createdDate\": \"2020-10-01\","+
         "  \"employerName\": \"someString\","+
         "  \"whatTypeOfBusiness\": \"someString\","+
         "  \"whatNameBusiness\": \"someString\","+
         "  \"establishedYear\": \"2020-10-01\","+
         "  \"annualDrawing3Yrs\": 123,"+
         "  \"empStartDate\": \"2020-10-01\","+
         "  \"empEndDate\": \"2020-10-01\","+
         "  \"sePositionHeld\": \"someString\","+
         "  \"occupationCategory\": \"someString\","+
         "  \"empEmploymentSeq\": 123,"+
         "  \"empAppRoleSeq\": 123,"+
         "  \"accountantAppRoleSeq\": 123"+
         "}"
  );
  public static Map sampleOtherIncomeResponseDD0 =  parse.parseMap(
         "{"+
         "  \"clientOtherIncomeSeq\": \"someString\","+
         "  \"otherIncomeType\": \"someString\","+
         "  \"incomeFreqRef\": \"1\","+
         "  \"amount\": 123"+
         "}"
  );
}