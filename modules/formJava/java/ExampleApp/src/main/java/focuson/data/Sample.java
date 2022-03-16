package focuson.data;
import java.util.Arrays;
import java.util.Map;
import java.util.List;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.json.JsonParser;
public class Sample{
    private static JsonParser parse = new JacksonJsonParser();
  public static Map sampleAccountAllFlags0 =  parse.parseMap(
         "{"+
         "  \"flags\": ["+
         "    {"+
         "      \"flagName\": \"Terrorist\","+
         "      \"flagValue\": true"+
         "    }"+
         "  ]"+
         "}"
  );
  public static List sampleAccountAllFlagsList0 =  parse.parseList(
         "["+
         "  {"+
         "    \"flagName\": \"Terrorist\","+
         "    \"flagValue\": true"+
         "  }"+
         "]"
  );
  public static Map sampleAccountDetails0 =  parse.parseMap(
         "{"+
         "  \"contactTitle\": \"BARON\","+
         "  \"contactForename\": \"Justin\","+
         "  \"contactSurname\": \"Tesla\","+
         "  \"practice\": \"PracXyz\","+
         "  \"addressLine1\": \"Pinetrees Road\","+
         "  \"addressLine2\": \"Norwich\","+
         "  \"addressLine3\": \"Norfolk\","+
         "  \"addressLine4\": \"Norfolkkk\","+
         "  \"postcode\": \"PLXYZ\","+
         "  \"telephone\": \"224567\""+
         "}"
  );
  public static Map sampleAccountOverview0 =  parse.parseMap(
         "{"+
         "  \"score\": 123,"+
         "  \"accountType\": \"checking\","+
         "  \"drawDownDate\": \"2020-10-01\","+
         "  \"repaymentDate\": \"2020-10-01\","+
         "  \"propertyValue\": 220000,"+
         "  \"mul\": 173750,"+
         "  \"drawDownAmount\": 90007,"+
         "  \"criteria\": ["+
         "    {"+
         "      \"criteria\": \"Account Management\""+
         "    }"+
         "  ],"+
         "  \"zFlagSet\": \"N\","+
         "  \"excessSixMonths\": 123,"+
         "  \"bouncedDDs12Months\": 123,"+
         "  \"unpaidCardOrMisuseItems\": 123"+
         "}"
  );
  public static List sampleAccountOverviewCriteria0 =  parse.parseList(
         "["+
         "  {"+
         "    \"criteria\": \"Account Management\""+
         "  }"+
         "]"
  );
  public static Map sampleAccountOverviewCriteriaLine0 =  parse.parseMap(
         "{"+
         "  \"criteria\": \"Account Management\""+
         "}"
  );
  public static Map sampleAccountOverviewExcessHistoryLine0 =  parse.parseMap(
         "{"+
         "  \"start\": \"2020-10-01\","+
         "  \"end\": \"2020-10-01\","+
         "  \"consecutiveDays\": 123"+
         "}"
  );
  public static Map sampleAccountOverviewExcessInfo0 =  parse.parseMap(
         "{"+
         "  \"dayOfCurrentExcess\": 123,"+
         "  \"currentExcessOnAccount\": 123,"+
         "  \"currentPctExcess\": 123,"+
         "  \"dateOfLastCapitalization\": \"2020-10-01\","+
         "  \"dateOfLastExcessFulfillment\": \"2020-10-01\""+
         "}"
  );
  public static List sampleAccountOverviewExcessLines0 =  parse.parseList(
         "["+
         "  {"+
         "    \"start\": \"2020-10-01\","+
         "    \"end\": \"2020-10-01\","+
         "    \"consecutiveDays\": 123"+
         "  }"+
         "]"
  );
  public static Map sampleAccountOverviewHistory0 =  parse.parseMap(
         "{"+
         "  \"history\": ["+
         "    {"+
         "      \"start\": \"2020-10-01\","+
         "      \"end\": \"2020-10-01\","+
         "      \"consecutiveDays\": 123"+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleAccountOverviewReason0 =  parse.parseMap(
         "{"+
         "  \"reason\": \"Really good reason\""+
         "}"
  );
  public static Map sampleAdditionalInformation0 =  parse.parseMap(
         "{"+
         "  \"applicantName\": \"Mr XXXXXXXXXX ABCD Fred Bloggs\","+
         "  \"employerName\": \"AnalystXYZ\","+
         "  \"addressLine1\": \"Pinetrees Road\","+
         "  \"addressLine2\": \"Norwich\","+
         "  \"addressLine3\": \"Norfolk\","+
         "  \"addressLine4\": \"Norfolkkk\","+
         "  \"postcode\": \"PLXYZ\""+
         "}"
  );
  public static Map sampleArrearsDetails0 =  parse.parseMap(
         "{"+
         "  \"history\": ["+
         "    {"+
         "      \"collectionsDate\": \"2020-10-01\","+
         "      \"creditedDate\": \"2020-10-01\","+
         "      \"minPayment\": 123,"+
         "      \"contractualAmount\": 123,"+
         "      \"paymentType\": \"dd\","+
         "      \"paymentReceived\": 123,"+
         "      \"shortfall\": 123,"+
         "      \"arrearsTotal\": 123,"+
         "      \"missedPayments\": 123"+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleArrearsDetailsLine0 =  parse.parseMap(
         "{"+
         "  \"collectionsDate\": \"2020-10-01\","+
         "  \"creditedDate\": \"2020-10-01\","+
         "  \"minPayment\": 123,"+
         "  \"contractualAmount\": 123,"+
         "  \"paymentType\": \"dd\","+
         "  \"paymentReceived\": 123,"+
         "  \"shortfall\": 123,"+
         "  \"arrearsTotal\": 123,"+
         "  \"missedPayments\": 123"+
         "}"
  );
  public static List sampleArrearsDetailsLines0 =  parse.parseList(
         "["+
         "  {"+
         "    \"collectionsDate\": \"2020-10-01\","+
         "    \"creditedDate\": \"2020-10-01\","+
         "    \"minPayment\": 123,"+
         "    \"contractualAmount\": 123,"+
         "    \"paymentType\": \"dd\","+
         "    \"paymentReceived\": 123,"+
         "    \"shortfall\": 123,"+
         "    \"arrearsTotal\": 123,"+
         "    \"missedPayments\": 123"+
         "  }"+
         "]"
  );
  public static Map sampleBusinessDetails0 =  parse.parseMap(
         "{"+
         "  \"applicantName\": \"Mr XXXXXXXXXX ABCD Fred Bloggs\","+
         "  \"businessName\": \"AnalystXYZ\","+
         "  \"addressLine1\": \"Pinetrees Road\","+
         "  \"addressLine2\": \"Norwich\","+
         "  \"addressLine3\": \"Norfolk\","+
         "  \"addressLine4\": \"Norfolkkk\","+
         "  \"postcode\": \"PLXYZ\""+
         "}"
  );
  public static Map sampleBusinessDetailsMain0 =  parse.parseMap(
         "{"+
         "  \"businessDetails\": {"+
         "    \"applicantName\": \"Mr XXXXXXXXXX ABCD Fred Bloggs\","+
         "    \"businessName\": \"AnalystXYZ\","+
         "    \"addressLine1\": \"Pinetrees Road\","+
         "    \"addressLine2\": \"Norwich\","+
         "    \"addressLine3\": \"Norfolk\","+
         "    \"addressLine4\": \"Norfolkkk\","+
         "    \"postcode\": \"PLXYZ\""+
         "  },"+
         "  \"businessFinancialDetails\": {"+
         "    \"turnoverLastYear\": \"10,000\","+
         "    \"turnoverPenultimateYear\": \"10,000\","+
         "    \"netProfitLastYear\": \"10,000\","+
         "    \"netProfitPenultimateYear\": \"10,000\","+
         "    \"drawingsLastYear\": \"10,000\","+
         "    \"drawingsPenultimateYear\": \"10,000\","+
         "    \"dividendsLastYear\": \"10,000\","+
         "    \"dividendsPenultimateYear\": \"10,000\","+
         "    \"netAssetsLastYear\": \"10,000\","+
         "    \"netAssetsPenultimateYear\": \"10,000\""+
         "  },"+
         "  \"detailsOfNonRecurringItems\": {"+
         "    \"nonRecurringItems\": \"Not Available\""+
         "  },"+
         "  \"detailsOfReevaluationOfAssets\": {"+
         "    \"revaluationOfAssets\": \"Not Available\""+
         "  },"+
         "  \"accountantDetails\": {"+
         "    \"contactTitle\": \"BARON\","+
         "    \"contactForename\": \"Justin\","+
         "    \"contactSurname\": \"Tesla\","+
         "    \"practice\": \"PracXyz\","+
         "    \"addressLine1\": \"Pinetrees Road\","+
         "    \"addressLine2\": \"Norwich\","+
         "    \"addressLine3\": \"Norfolk\","+
         "    \"addressLine4\": \"Norfolkkk\","+
         "    \"postcode\": \"PLXYZ\","+
         "    \"telephone\": \"224567\""+
         "  }"+
         "}"
  );
  public static Map sampleBusinessFinancialDetails0 =  parse.parseMap(
         "{"+
         "  \"turnoverLastYear\": \"10,000\","+
         "  \"turnoverPenultimateYear\": \"10,000\","+
         "  \"netProfitLastYear\": \"10,000\","+
         "  \"netProfitPenultimateYear\": \"10,000\","+
         "  \"drawingsLastYear\": \"10,000\","+
         "  \"drawingsPenultimateYear\": \"10,000\","+
         "  \"dividendsLastYear\": \"10,000\","+
         "  \"dividendsPenultimateYear\": \"10,000\","+
         "  \"netAssetsLastYear\": \"10,000\","+
         "  \"netAssetsPenultimateYear\": \"10,000\""+
         "}"
  );
  public static Map sampleChequeCreditbooks0 =  parse.parseMap(
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
  public static List sampleChequeCreditbooksHistory0 =  parse.parseList(
         "["+
         "  {"+
         "    \"serialNumber\": 937453,"+
         "    \"howOrdered\": \"Manually\","+
         "    \"dateOrder\": \"2022-10-01\""+
         "  }"+
         "]"
  );
  public static Map sampleChequeCreditbooksHistoryLine0 =  parse.parseMap(
         "{"+
         "  \"serialNumber\": 937453,"+
         "  \"howOrdered\": \"Manually\","+
         "  \"dateOrder\": \"2022-10-01\""+
         "}"
  );
  public static Map sampleContractTypesResponse0 =  parse.parseMap(
         "{"+
         "  \"contractTypeId\": 123,"+
         "  \"description\": \"someString\""+
         "}"
  );
  public static Map sampleCreateEAccountData0 =  parse.parseMap(
         "{"+
         "  \"name\": \"This is a one line string\","+
         "  \"type\": \"checking\","+
         "  \"savingsStyle\": \"adHoc\","+
         "  \"initialAmount\": 123"+
         "}"
  );
  public static Map sampleCreatePlan0 =  parse.parseMap(
         "{"+
         "  \"createPlanStart\": \"2022-01-01\","+
         "  \"createPlanDate\": \"2022-03-01\","+
         "  \"createPlanEnd\": \"2022-10-01\""+
         "}"
  );
  public static List sampleCustomerOccupationIncomeDetails0 =  parse.parseList(
         "["+
         "  {"+
         "    \"areYou\": \"C\","+
         "    \"occupation\": \"someString\","+
         "    \"customerDescription\": \"someString\","+
         "    \"ownShareOfTheCompany\": \"N\","+
         "    \"owningSharesPct\": \"N\","+
         "    \"workFor\": \"someString\","+
         "    \"annualSalaryBeforeDeduction\": 123,"+
         "    \"annualIncomeExcludingRent\": 123,"+
         "    \"regularCommissionBonus\": 123,"+
         "    \"whatTypeOfBusiness\": \"someString\","+
         "    \"whatNameBusiness\": \"someString\","+
         "    \"establishedYear\": \"someString\","+
         "    \"annualDrawing3Yrs\": 123,"+
         "    \"employmentType\": \"0\","+
         "    \"empStartDate\": \"2020-10-01\","+
         "    \"empEndDate\": \"2020-10-01\","+
         "    \"dateOfEmploymentStart\": \"someString\","+
         "    \"otherSourceOfIncome\": \"N\","+
         "    \"createdBy\": \"someString\","+
         "    \"createdDate\": \"2020-10-01\","+
         "    \"employerName\": \"someString\","+
         "    \"sePositionHeld\": \"someString\","+
         "    \"occupationCategory\": \"someString\","+
         "    \"empEmploymentSeq\": 123,"+
         "    \"empAppRoleSeq\": 123,"+
         "    \"accountantAppRoleSeq\": 123,"+
         "    \"currentEmployment\": \"N\""+
         "  }"+
         "]"
  );
  public static Map sampleDetailsOfNonRecurringItems0 =  parse.parseMap(
         "{"+
         "  \"nonRecurringItems\": \"Not Available\""+
         "}"
  );
  public static Map sampleDetailsOfReevaluationOfAssets0 =  parse.parseMap(
         "{"+
         "  \"revaluationOfAssets\": \"Not Available\""+
         "}"
  );
  public static Map sampleDropdowns0 =  parse.parseMap(
         "{"+
         "  \"occupationDescriptionResponse\": {"+
         "    \"descTypeValue\": \"someString\","+
         "    \"descTypeName\": \"someString\""+
         "  },"+
         "  \"employmentStatus\": {"+
         "    \"employmentName\": \"someString\","+
         "    \"employmentValue\": \"someString\""+
         "  },"+
         "  \"contractTypesResponse\": {"+
         "    \"contractTypeId\": 123,"+
         "    \"description\": \"someString\""+
         "  },"+
         "  \"frequenciesResponse\": {"+
         "    \"frequencyId\": 123,"+
         "    \"frequencyDescription\": \"someString\","+
         "    \"annualMultiple\": 123"+
         "  }"+
         "}"
  );
  public static Map sampleEAccountsSummary0 =  parse.parseMap(
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
  public static List sampleEAccountsSummaryTable0 =  parse.parseList(
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
  public static Map sampleEAccountSummary0 =  parse.parseMap(
         "{"+
         "  \"accountId\": 1233450,"+
         "  \"displayType\": \"checking\","+
         "  \"description\": \"This account has a description\","+
         "  \"virtualBankSeq\": \"seq1\","+
         "  \"total\": 1000,"+
         "  \"frequency\": \"23\""+
         "}"
  );
  public static Map sampleEmploymentStatus0 =  parse.parseMap(
         "{"+
         "  \"employmentName\": \"someString\","+
         "  \"employmentValue\": \"someString\""+
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
  public static Map sampleFrequenciesResponse0 =  parse.parseMap(
         "{"+
         "  \"frequencyId\": 123,"+
         "  \"frequencyDescription\": \"someString\","+
         "  \"annualMultiple\": 123"+
         "}"
  );
  public static Map sampleListOccupations0 =  parse.parseMap(
         "{"+
         "  \"occupationsList\": ["+
         "    {"+
         "      \"descTypeValue\": \"someString\","+
         "      \"descTypeName\": \"someString\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleOccountOneFlag0 =  parse.parseMap(
         "{"+
         "  \"flagName\": \"Terrorist\","+
         "  \"flagValue\": true"+
         "}"
  );
  public static Map sampleOccupationAndIncomeFullDomain0 =  parse.parseMap(
         "{"+
         "  \"mainCustomerName\": \"Mr XXXXXXXXXX J ABCD Fred Bloggs\","+
         "  \"jointCustomerName\": \"\","+
         "  \"mainClientRef\": 13606326,"+
         "  \"jointClientRef\": -1,"+
         "  \"customerOccupationIncomeDetails\": ["+
         "    {"+
         "      \"areYou\": \"C\","+
         "      \"occupation\": \"someString\","+
         "      \"customerDescription\": \"someString\","+
         "      \"ownShareOfTheCompany\": \"N\","+
         "      \"owningSharesPct\": \"N\","+
         "      \"workFor\": \"someString\","+
         "      \"annualSalaryBeforeDeduction\": 123,"+
         "      \"annualIncomeExcludingRent\": 123,"+
         "      \"regularCommissionBonus\": 123,"+
         "      \"whatTypeOfBusiness\": \"someString\","+
         "      \"whatNameBusiness\": \"someString\","+
         "      \"establishedYear\": \"someString\","+
         "      \"annualDrawing3Yrs\": 123,"+
         "      \"employmentType\": \"0\","+
         "      \"empStartDate\": \"2020-10-01\","+
         "      \"empEndDate\": \"2020-10-01\","+
         "      \"dateOfEmploymentStart\": \"someString\","+
         "      \"otherSourceOfIncome\": \"N\","+
         "      \"createdBy\": \"someString\","+
         "      \"createdDate\": \"2020-10-01\","+
         "      \"employerName\": \"someString\","+
         "      \"sePositionHeld\": \"someString\","+
         "      \"occupationCategory\": \"someString\","+
         "      \"empEmploymentSeq\": 123,"+
         "      \"empAppRoleSeq\": 123,"+
         "      \"accountantAppRoleSeq\": 123,"+
         "      \"currentEmployment\": \"N\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleOccupationDescriptionResponse0 =  parse.parseMap(
         "{"+
         "  \"descTypeValue\": \"someString\","+
         "  \"descTypeName\": \"someString\""+
         "}"
  );
  public static List sampleOccupationsList0 =  parse.parseList(
         "["+
         "  {"+
         "    \"descTypeValue\": \"someString\","+
         "    \"descTypeName\": \"someString\""+
         "  }"+
         "]"
  );
  public static Map sampleOneOccupationIncomeDetails0 =  parse.parseMap(
         "{"+
         "  \"areYou\": \"C\","+
         "  \"occupation\": \"someString\","+
         "  \"customerDescription\": \"someString\","+
         "  \"ownShareOfTheCompany\": \"N\","+
         "  \"owningSharesPct\": \"N\","+
         "  \"workFor\": \"someString\","+
         "  \"annualSalaryBeforeDeduction\": 123,"+
         "  \"annualIncomeExcludingRent\": 123,"+
         "  \"regularCommissionBonus\": 123,"+
         "  \"whatTypeOfBusiness\": \"someString\","+
         "  \"whatNameBusiness\": \"someString\","+
         "  \"establishedYear\": \"someString\","+
         "  \"annualDrawing3Yrs\": 123,"+
         "  \"employmentType\": \"0\","+
         "  \"empStartDate\": \"2020-10-01\","+
         "  \"empEndDate\": \"2020-10-01\","+
         "  \"dateOfEmploymentStart\": \"someString\","+
         "  \"otherSourceOfIncome\": \"N\","+
         "  \"createdBy\": \"someString\","+
         "  \"createdDate\": \"2020-10-01\","+
         "  \"employerName\": \"someString\","+
         "  \"sePositionHeld\": \"someString\","+
         "  \"occupationCategory\": \"someString\","+
         "  \"empEmploymentSeq\": 123,"+
         "  \"empAppRoleSeq\": 123,"+
         "  \"accountantAppRoleSeq\": 123,"+
         "  \"currentEmployment\": \"N\""+
         "}"
  );
  public static Map sampleOtherIncomeResponse0 =  parse.parseMap(
         "{"+
         "  \"clientOtherIncomeSeq\": \"someString\","+
         "  \"otherIncomeType\": \"someString\","+
         "  \"incomeFreqRef\": \"0\","+
         "  \"amount\": 123"+
         "}"
  );
  public static List samplePostCodeData0 =  parse.parseList(
         "["+
         "  {"+
         "    \"line1\": \"4 Privet drive\","+
         "    \"line2\": \"Little Whinging\","+
         "    \"line3\": \"Surrey\","+
         "    \"line4\": \"England\""+
         "  }"+
         "]"
  );
  public static Map samplePostCodeDataLine0 =  parse.parseMap(
         "{"+
         "  \"line1\": \"4 Privet drive\","+
         "  \"line2\": \"Little Whinging\","+
         "  \"line3\": \"Surrey\","+
         "  \"line4\": \"England\""+
         "}"
  );
  public static Map samplePostCodeMainPage0 =  parse.parseMap(
         "{"+
         "  \"name\": \"This is a one line string\","+
         "  \"line1\": \"4 Privet drive\","+
         "  \"line2\": \"Little Whinging\","+
         "  \"line3\": \"Surrey\","+
         "  \"line4\": \"England\","+
         "  \"postcode\": \"This is a one line string\""+
         "}"
  );
  public static Map samplePostCodeSearch0 =  parse.parseMap(
         "{"+
         "  \"search\": \"LS21 3EY\","+
         "  \"searchResults\": ["+
         "    {"+
         "      \"line1\": \"4 Privet drive\","+
         "      \"line2\": \"Little Whinging\","+
         "      \"line3\": \"Surrey\","+
         "      \"line4\": \"England\""+
         "    }"+
         "  ],"+
         "  \"addressResults\": {"+
         "    \"line1\": \"4 Privet drive\","+
         "    \"line2\": \"Little Whinging\","+
         "    \"line3\": \"Surrey\","+
         "    \"line4\": \"England\""+
         "  }"+
         "}"
  );
  public static Map sampleRepeatingLine0 =  parse.parseMap(
         "{"+
         "  \"name\": \"This is a one line string\","+
         "  \"age\": 123"+
         "}"
  );
  public static List sampleRepeatingWholeData0 =  parse.parseList(
         "["+
         "  {"+
         "    \"name\": \"This is a one line string\","+
         "    \"age\": 123"+
         "  }"+
         "]"
  );
}