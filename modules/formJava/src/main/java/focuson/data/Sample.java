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
         "      \"flagName\": \"Capitalised\","+
         "      \"flagValue\": true"+
         "    },"+
         "    {"+
         "      \"flagName\": \"Contigent Obligations\","+
         "      \"flagValue\": false"+
         "    },"+
         "    {"+
         "      \"flagName\": \"Capitalised\","+
         "      \"flagValue\": true"+
         "    }"+
         "  ]"+
         "}"
  );
  public static List sampleAccountAllFlagsList0 =  parse.parseList(
         "["+
         "  {"+
         "    \"flagName\": \"Capitalised\","+
         "    \"flagValue\": true"+
         "  },"+
         "  {"+
         "    \"flagName\": \"Contigent Obligations\","+
         "    \"flagValue\": false"+
         "  },"+
         "  {"+
         "    \"flagName\": \"Capitalised\","+
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
  public static Map sampleAccountOneFlag0 =  parse.parseMap(
         "{"+
         "  \"flagName\": \"Capitalised\","+
         "  \"flagValue\": true"+
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
         "    },"+
         "    {"+
         "      \"criteria\": \"Affordability check failed\""+
         "    },"+
         "    {"+
         "      \"criteria\": \"Account Management\""+
         "    }"+
         "  ],"+
         "  \"zFlagSet\": \"N\","+
         "  \"excessSixMonths\": 1,"+
         "  \"bouncedDDs12Months\": 3,"+
         "  \"unpaidCardOrMisuseItems\": 0,"+
         "  \"currentBalance\": 123,"+
         "  \"currentInterestRate\": 12,"+
         "  \"facilities\": {"+
         "    \"facilities\": ["+
         "      {"+
         "        \"facility\": 1234,"+
         "        \"changeDate\": \"23-03-2022\","+
         "        \"unApproved\": true,"+
         "        \"reason\": \"some reason\","+
         "        \"amount\": 2345"+
         "      },"+
         "      {"+
         "        \"facility\": 1234,"+
         "        \"changeDate\": \"23-03-2022\","+
         "        \"unApproved\": true,"+
         "        \"reason\": \"some reason\","+
         "        \"amount\": 2345"+
         "      },"+
         "      {"+
         "        \"facility\": 1234,"+
         "        \"changeDate\": \"23-03-2022\","+
         "        \"unApproved\": true,"+
         "        \"reason\": \"some reason\","+
         "        \"amount\": 2345"+
         "      }"+
         "    ]"+
         "  },"+
         "  \"highBalance\": 1000,"+
         "  \"lowBalance\": 23,"+
         "  \"pctOfFacility\": 27,"+
         "  \"eightyPctFacility\": 800,"+
         "  \"eightyFivePctFacility\": 234"+
         "}"
  );
  public static Map sampleAccountOverviewAgreementType0 =  parse.parseMap(
         "{"+
         "  \"agreementType\": \"checking\","+
         "  \"transactionHeading\": \"option1\""+
         "}"
  );
  public static List sampleAccountOverviewCriteria0 =  parse.parseList(
         "["+
         "  {"+
         "    \"criteria\": \"Account Management\""+
         "  },"+
         "  {"+
         "    \"criteria\": \"Affordability check failed\""+
         "  },"+
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
         "  },"+
         "  {"+
         "    \"start\": \"2022-14-01\","+
         "    \"end\": \"2022-14-01\","+
         "    \"consecutiveDays\": 456"+
         "  },"+
         "  {"+
         "    \"start\": \"2020-10-01\","+
         "    \"end\": \"2020-10-01\","+
         "    \"consecutiveDays\": 123"+
         "  }"+
         "]"
  );
  public static Map sampleAccountOverviewFacilities0 =  parse.parseMap(
         "{"+
         "  \"facilities\": ["+
         "    {"+
         "      \"facility\": 1234,"+
         "      \"changeDate\": \"23-03-2022\","+
         "      \"unApproved\": true,"+
         "      \"reason\": \"some reason\","+
         "      \"amount\": 2345"+
         "    },"+
         "    {"+
         "      \"facility\": 1234,"+
         "      \"changeDate\": \"23-03-2022\","+
         "      \"unApproved\": true,"+
         "      \"reason\": \"some reason\","+
         "      \"amount\": 2345"+
         "    },"+
         "    {"+
         "      \"facility\": 1234,"+
         "      \"changeDate\": \"23-03-2022\","+
         "      \"unApproved\": true,"+
         "      \"reason\": \"some reason\","+
         "      \"amount\": 2345"+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleAccountOverviewFacilitiesLine0 =  parse.parseMap(
         "{"+
         "  \"facility\": 1234,"+
         "  \"changeDate\": \"23-03-2022\","+
         "  \"unApproved\": true,"+
         "  \"reason\": \"some reason\","+
         "  \"amount\": 2345"+
         "}"
  );
  public static List sampleAccountOverviewFacilitiesLines0 =  parse.parseList(
         "["+
         "  {"+
         "    \"facility\": 1234,"+
         "    \"changeDate\": \"23-03-2022\","+
         "    \"unApproved\": true,"+
         "    \"reason\": \"some reason\","+
         "    \"amount\": 2345"+
         "  },"+
         "  {"+
         "    \"facility\": 1234,"+
         "    \"changeDate\": \"23-03-2022\","+
         "    \"unApproved\": true,"+
         "    \"reason\": \"some reason\","+
         "    \"amount\": 2345"+
         "  },"+
         "  {"+
         "    \"facility\": 1234,"+
         "    \"changeDate\": \"23-03-2022\","+
         "    \"unApproved\": true,"+
         "    \"reason\": \"some reason\","+
         "    \"amount\": 2345"+
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
         "    },"+
         "    {"+
         "      \"start\": \"2022-14-01\","+
         "      \"end\": \"2022-14-01\","+
         "      \"consecutiveDays\": 456"+
         "    },"+
         "    {"+
         "      \"start\": \"2020-10-01\","+
         "      \"end\": \"2020-10-01\","+
         "      \"consecutiveDays\": 123"+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleAccountOverviewOptOut0 =  parse.parseMap(
         "{"+
         "  \"optOut\": ["+
         "    {"+
         "      \"optedOut\": true,"+
         "      \"addrLine5\": \"someString\","+
         "      \"changedBy\": \"someString\","+
         "      \"changedDate\": \"2020-10-01\""+
         "    },"+
         "    {"+
         "      \"optedOut\": false,"+
         "      \"addrLine5\": \"anotherString\","+
         "      \"changedBy\": \"anotherString\","+
         "      \"changedDate\": \"2022-14-01\""+
         "    },"+
         "    {"+
         "      \"optedOut\": true,"+
         "      \"addrLine5\": \"someString\","+
         "      \"changedBy\": \"someString\","+
         "      \"changedDate\": \"2020-10-01\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleAccountOverviewOptOutLine0 =  parse.parseMap(
         "{"+
         "  \"optedOut\": true,"+
         "  \"addrLine5\": \"someString\","+
         "  \"changedBy\": \"someString\","+
         "  \"changedDate\": \"2020-10-01\""+
         "}"
  );
  public static List sampleAccountOverviewOptOutLines0 =  parse.parseList(
         "["+
         "  {"+
         "    \"optedOut\": true,"+
         "    \"addrLine5\": \"someString\","+
         "    \"changedBy\": \"someString\","+
         "    \"changedDate\": \"2020-10-01\""+
         "  },"+
         "  {"+
         "    \"optedOut\": false,"+
         "    \"addrLine5\": \"anotherString\","+
         "    \"changedBy\": \"anotherString\","+
         "    \"changedDate\": \"2022-14-01\""+
         "  },"+
         "  {"+
         "    \"optedOut\": true,"+
         "    \"addrLine5\": \"someString\","+
         "    \"changedBy\": \"someString\","+
         "    \"changedDate\": \"2020-10-01\""+
         "  }"+
         "]"
  );
  public static Map sampleAccountOverviewReason0 =  parse.parseMap(
         "{"+
         "  \"reason\": \"Second charge case\""+
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
         "  \"details\": ["+
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
         "    },"+
         "    {"+
         "      \"collectionsDate\": \"2022-14-01\","+
         "      \"creditedDate\": \"2022-14-01\","+
         "      \"minPayment\": 456,"+
         "      \"contractualAmount\": 456,"+
         "      \"paymentType\": \"ddResubmit\","+
         "      \"paymentReceived\": 456,"+
         "      \"shortfall\": 456,"+
         "      \"arrearsTotal\": 456,"+
         "      \"missedPayments\": 456"+
         "    },"+
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
         "  },"+
         "  {"+
         "    \"collectionsDate\": \"2022-14-01\","+
         "    \"creditedDate\": \"2022-14-01\","+
         "    \"minPayment\": 456,"+
         "    \"contractualAmount\": 456,"+
         "    \"paymentType\": \"ddResubmit\","+
         "    \"paymentReceived\": 456,"+
         "    \"shortfall\": 456,"+
         "    \"arrearsTotal\": 456,"+
         "    \"missedPayments\": 456"+
         "  },"+
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
         "    \"turnoverPenultimateYear\": \"11,000\","+
         "    \"netProfitLastYear\": \"12,000\","+
         "    \"netProfitPenultimateYear\": \"9,000\","+
         "    \"drawingsLastYear\": \"13,000\","+
         "    \"drawingsPenultimateYear\": \"100,000\","+
         "    \"dividendsLastYear\": \"15,000\","+
         "    \"dividendsPenultimateYear\": \"3,000\","+
         "    \"netAssetsLastYear\": \"1,000\","+
         "    \"netAssetsPenultimateYear\": \"2,000\""+
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
         "  \"turnoverPenultimateYear\": \"11,000\","+
         "  \"netProfitLastYear\": \"12,000\","+
         "  \"netProfitPenultimateYear\": \"9,000\","+
         "  \"drawingsLastYear\": \"13,000\","+
         "  \"drawingsPenultimateYear\": \"100,000\","+
         "  \"dividendsLastYear\": \"15,000\","+
         "  \"dividendsPenultimateYear\": \"3,000\","+
         "  \"netAssetsLastYear\": \"1,000\","+
         "  \"netAssetsPenultimateYear\": \"2,000\""+
         "}"
  );
  public static Map sampleChequeCreditbooks0 =  parse.parseMap(
         "{"+
         "  \"history\": ["+
         "    {"+
         "      \"serialNumber\": 937453,"+
         "      \"howOrdered\": \"Manually\","+
         "      \"dateOrder\": \"2022-10-01\""+
         "    },"+
         "    {"+
         "      \"serialNumber\": 937453,"+
         "      \"howOrdered\": \"Manually\","+
         "      \"dateOrder\": \"2022-10-01\""+
         "    },"+
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
         "  },"+
         "  {"+
         "    \"serialNumber\": 937453,"+
         "    \"howOrdered\": \"Manually\","+
         "    \"dateOrder\": \"2022-10-01\""+
         "  },"+
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
  public static Map sampleCollectionItem0 =  parse.parseMap(
         "{"+
         "  \"paymentId\": 123,"+
         "  \"collectionDate\": \"2020-10-01\","+
         "  \"amount\": 56657,"+
         "  \"status\": \"C\""+
         "}"
  );
  public static List sampleCollectionsList0 =  parse.parseList(
         "["+
         "  {"+
         "    \"paymentId\": 123,"+
         "    \"collectionDate\": \"2020-10-01\","+
         "    \"amount\": 56657,"+
         "    \"status\": \"C\""+
         "  },"+
         "  {"+
         "    \"paymentId\": 456,"+
         "    \"collectionDate\": \"2022-14-01\","+
         "    \"amount\": 32834,"+
         "    \"status\": \"P\""+
         "  },"+
         "  {"+
         "    \"paymentId\": 123,"+
         "    \"collectionDate\": \"2020-10-01\","+
         "    \"amount\": 56657,"+
         "    \"status\": \"C\""+
         "  },"+
         "  {"+
         "    \"paymentId\": 456,"+
         "    \"collectionDate\": \"2022-14-01\","+
         "    \"amount\": 32834,"+
         "    \"status\": \"P\""+
         "  }"+
         "]"
  );
  public static Map sampleCollectionSummary0 =  parse.parseMap(
         "{"+
         "  \"lastCollectionDate\": \"2021/10/6\","+
         "  \"lastCollectionAmount\": 1234,"+
         "  \"nextCollectionDate\": \"2022/10/6\","+
         "  \"nextCollectionAmount\": 13434,"+
         "  \"allowance\": 1000,"+
         "  \"period\": \"Monthly\""+
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
  public static Map sampleCreatePayment0 =  parse.parseMap(
         "{"+
         "  \"amount\": 56657,"+
         "  \"collectionDate\": \"2020-10-01\","+
         "  \"reason\": \"\","+
         "  \"allowance\": 123,"+
         "  \"period\": \"Monthly\""+
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
         "    \"occupation\": \"W045\","+
         "    \"customerDescription\": \"XXXXXXXXX\","+
         "    \"ownShareOfTheCompany\": \"N\","+
         "    \"owningSharesPct\": \"N\","+
         "    \"workFor\": \"S.C. Bosch S.R.L.\","+
         "    \"employmentType\": \"0\","+
         "    \"empStartDate\": \"10/2002\","+
         "    \"empEndDate\": \"10/2003\","+
         "    \"annualSalaryBeforeDeduction\": 20315,"+
         "    \"annualIncomeExcludingRent\": 13255,"+
         "    \"regularCommissionBonus\": 500,"+
         "    \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "    \"whatNameBusiness\": \"XXXXXXXXX\","+
         "    \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "    \"annualDrawing3Yrs\": 100000,"+
         "    \"otherSourceOfIncome\": \"N\","+
         "    \"createdBy\": \"Seras Alin\","+
         "    \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "    \"employerName\": \"My employer name\","+
         "    \"sePositionHeld\": \"DIR\","+
         "    \"occupationCategory\": \"SK\","+
         "    \"empEmploymentSeq\": 999999,"+
         "    \"empAppRoleSeq\": 14648851,"+
         "    \"accountantAppRoleSeq\": 14648851,"+
         "    \"currentEmployment\": \"N\""+
         "  },"+
         "  {"+
         "    \"areYou\": \"E\","+
         "    \"occupation\": \"W045\","+
         "    \"customerDescription\": \"XXXXXXXXX\","+
         "    \"ownShareOfTheCompany\": \"X\","+
         "    \"owningSharesPct\": \"X\","+
         "    \"workFor\": \"S.C. Bosch S.R.L.\","+
         "    \"employmentType\": \"1\","+
         "    \"empStartDate\": \"10/2002\","+
         "    \"empEndDate\": \"10/2003\","+
         "    \"annualSalaryBeforeDeduction\": 20315,"+
         "    \"annualIncomeExcludingRent\": 13255,"+
         "    \"regularCommissionBonus\": 500,"+
         "    \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "    \"whatNameBusiness\": \"XXXXXXXXX\","+
         "    \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "    \"annualDrawing3Yrs\": 100000,"+
         "    \"otherSourceOfIncome\": \"X\","+
         "    \"createdBy\": \"Seras Alin\","+
         "    \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "    \"employerName\": \"My employer name\","+
         "    \"sePositionHeld\": \"DIR\","+
         "    \"occupationCategory\": \"SK\","+
         "    \"empEmploymentSeq\": 999999,"+
         "    \"empAppRoleSeq\": 14648851,"+
         "    \"accountantAppRoleSeq\": 14648851,"+
         "    \"currentEmployment\": \"X\""+
         "  },"+
         "  {"+
         "    \"areYou\": \"H\","+
         "    \"occupation\": \"W045\","+
         "    \"customerDescription\": \"XXXXXXXXX\","+
         "    \"ownShareOfTheCompany\": \"Y\","+
         "    \"owningSharesPct\": \"Y\","+
         "    \"workFor\": \"S.C. Bosch S.R.L.\","+
         "    \"employmentType\": \"2\","+
         "    \"empStartDate\": \"10/2002\","+
         "    \"empEndDate\": \"10/2003\","+
         "    \"annualSalaryBeforeDeduction\": 20315,"+
         "    \"annualIncomeExcludingRent\": 13255,"+
         "    \"regularCommissionBonus\": 500,"+
         "    \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "    \"whatNameBusiness\": \"XXXXXXXXX\","+
         "    \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "    \"annualDrawing3Yrs\": 100000,"+
         "    \"otherSourceOfIncome\": \"Y\","+
         "    \"createdBy\": \"Seras Alin\","+
         "    \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "    \"employerName\": \"My employer name\","+
         "    \"sePositionHeld\": \"DIR\","+
         "    \"occupationCategory\": \"SK\","+
         "    \"empEmploymentSeq\": 999999,"+
         "    \"empAppRoleSeq\": 14648851,"+
         "    \"accountantAppRoleSeq\": 14648851,"+
         "    \"currentEmployment\": \"Y\""+
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
         "    \"descTypeValue\": \"W54\","+
         "    \"descTypeName\": \"Engineer\""+
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
         "      \"description\": \"This account's description\","+
         "      \"virtualBankSeq\": \"seq1\","+
         "      \"total\": 1000,"+
         "      \"frequency\": \"23\""+
         "    },"+
         "    {"+
         "      \"accountId\": 3233450,"+
         "      \"displayType\": \"savings\","+
         "      \"description\": \"This account's description\","+
         "      \"virtualBankSeq\": \"seq2\","+
         "      \"total\": 2991,"+
         "      \"frequency\": \"23\""+
         "    },"+
         "    {"+
         "      \"accountId\": 4333450,"+
         "      \"displayType\": \"checking\","+
         "      \"description\": \"This account's description\","+
         "      \"virtualBankSeq\": \"seq3\","+
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
         "    \"description\": \"This account's description\","+
         "    \"virtualBankSeq\": \"seq1\","+
         "    \"total\": 1000,"+
         "    \"frequency\": \"23\""+
         "  },"+
         "  {"+
         "    \"accountId\": 3233450,"+
         "    \"displayType\": \"savings\","+
         "    \"description\": \"This account's description\","+
         "    \"virtualBankSeq\": \"seq2\","+
         "    \"total\": 2991,"+
         "    \"frequency\": \"23\""+
         "  },"+
         "  {"+
         "    \"accountId\": 4333450,"+
         "    \"displayType\": \"checking\","+
         "    \"description\": \"This account's description\","+
         "    \"virtualBankSeq\": \"seq3\","+
         "    \"total\": 1000,"+
         "    \"frequency\": \"23\""+
         "  }"+
         "]"
  );
  public static Map sampleEAccountSummary0 =  parse.parseMap(
         "{"+
         "  \"accountId\": 1233450,"+
         "  \"displayType\": \"checking\","+
         "  \"description\": \"This account's description\","+
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
  public static Map sampleHelloWorldDomainData0 =  parse.parseMap(
         "{"+
         "  \"message\": \"Greetings message !\""+
         "}"
  );
  public static Map sampleJointAccount0 =  parse.parseMap(
         "{"+
         "  \"balance\": 123,"+
         "  \"main\": {"+
         "    \"name\": \"Fred Bloggs\","+
         "    \"addresses\": ["+
         "      {"+
         "        \"line1\": \"This is a one line string\","+
         "        \"line2\": \"This is a one line string\""+
         "      },"+
         "      {"+
         "        \"line1\": \"another one line string\","+
         "        \"line2\": \"another one line string\""+
         "      },"+
         "      {"+
         "        \"line1\": \"This is a one line string\","+
         "        \"line2\": \"This is a one line string\""+
         "      }"+
         "    ]"+
         "  },"+
         "  \"joint\": {"+
         "    \"name\": \"Jill Blogs\","+
         "    \"addresses\": ["+
         "      {"+
         "        \"line1\": \"another one line string\","+
         "        \"line2\": \"another one line string\""+
         "      },"+
         "      {"+
         "        \"line1\": \"another one line string\","+
         "        \"line2\": \"another one line string\""+
         "      },"+
         "      {"+
         "        \"line1\": \"This is a one line string\","+
         "        \"line2\": \"This is a one line string\""+
         "      }"+
         "    ]"+
         "  }"+
         "}"
  );
  public static Map sampleJointAccountAddress0 =  parse.parseMap(
         "{"+
         "  \"line1\": \"This is a one line string\","+
         "  \"line2\": \"This is a one line string\""+
         "}"
  );
  public static List sampleJointAccountAddresses0 =  parse.parseList(
         "["+
         "  {"+
         "    \"line1\": \"This is a one line string\","+
         "    \"line2\": \"This is a one line string\""+
         "  },"+
         "  {"+
         "    \"line1\": \"another one line string\","+
         "    \"line2\": \"another one line string\""+
         "  },"+
         "  {"+
         "    \"line1\": \"This is a one line string\","+
         "    \"line2\": \"This is a one line string\""+
         "  }"+
         "]"
  );
  public static Map sampleJointAccountCustomer0 =  parse.parseMap(
         "{"+
         "  \"name\": \"Fred Bloggs\","+
         "  \"addresses\": ["+
         "    {"+
         "      \"line1\": \"This is a one line string\","+
         "      \"line2\": \"This is a one line string\""+
         "    },"+
         "    {"+
         "      \"line1\": \"another one line string\","+
         "      \"line2\": \"another one line string\""+
         "    },"+
         "    {"+
         "      \"line1\": \"This is a one line string\","+
         "      \"line2\": \"This is a one line string\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleLinkedAccountDetailsDisplay0 =  parse.parseMap(
         "{"+
         "  \"mandate\": {"+
         "    \"sortCode\": \"10-11-12\","+
         "    \"accountId\": 12341234,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Bank Of Happiness\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-34\""+
         "  },"+
         "  \"collectionSummary\": {"+
         "    \"lastCollectionDate\": \"2021/10/6\","+
         "    \"lastCollectionAmount\": 1234,"+
         "    \"nextCollectionDate\": \"2022/10/6\","+
         "    \"nextCollectionAmount\": 13434,"+
         "    \"allowance\": 1000,"+
         "    \"period\": \"Monthly\""+
         "  },"+
         "  \"collectionHistory\": ["+
         "    {"+
         "      \"paymentId\": 123,"+
         "      \"collectionDate\": \"2020-10-01\","+
         "      \"amount\": 56657,"+
         "      \"status\": \"C\""+
         "    },"+
         "    {"+
         "      \"paymentId\": 456,"+
         "      \"collectionDate\": \"2022-14-01\","+
         "      \"amount\": 32834,"+
         "      \"status\": \"P\""+
         "    },"+
         "    {"+
         "      \"paymentId\": 123,"+
         "      \"collectionDate\": \"2020-10-01\","+
         "      \"amount\": 56657,"+
         "      \"status\": \"C\""+
         "    },"+
         "    {"+
         "      \"paymentId\": 456,"+
         "      \"collectionDate\": \"2022-14-01\","+
         "      \"amount\": 32834,"+
         "      \"status\": \"P\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleListOccupations0 =  parse.parseMap(
         "{"+
         "  \"search\": \"Hair dresser\","+
         "  \"selectedOccupationName\": \"someString\","+
         "  \"searchResults\": ["+
         "    {"+
         "      \"descTypeValue\": \"W54\","+
         "      \"descTypeName\": \"Engineer\""+
         "    },"+
         "    {"+
         "      \"descTypeValue\": \"W54\","+
         "      \"descTypeName\": \"Engineer\""+
         "    },"+
         "    {"+
         "      \"descTypeValue\": \"W54\","+
         "      \"descTypeName\": \"Engineer\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleListOfPayments0 =  parse.parseMap(
         "{"+
         "  \"standingOrders\": {"+
         "    \"shouldPrint\": true,"+
         "    \"numberOfItems\": 1"+
         "  },"+
         "  \"openBankingStandingOrders\": {"+
         "    \"shouldPrint\": false,"+
         "    \"numberOfItems\": 2"+
         "  },"+
         "  \"directDebits\": {"+
         "    \"shouldPrint\": true,"+
         "    \"numberOfItems\": 3"+
         "  },"+
         "  \"billPayments\": {"+
         "    \"shouldPrint\": false,"+
         "    \"numberOfItems\": 4"+
         "  },"+
         "  \"openBanking\": {"+
         "    \"shouldPrint\": true,"+
         "    \"numberOfItems\": 5"+
         "  }"+
         "}"
  );
  public static Map sampleMandate0 =  parse.parseMap(
         "{"+
         "  \"sortCode\": \"10-11-12\","+
         "  \"accountId\": 12341234,"+
         "  \"mandateStatus\": \"ACTIVE\","+
         "  \"bankName\": \"Bank Of Happiness\","+
         "  \"accountName\": \"F & J Bloggs\","+
         "  \"mandateRef\": \"12099845-34\""+
         "}"
  );
  public static List sampleMandateList0 =  parse.parseList(
         "["+
         "  {"+
         "    \"sortCode\": \"10-11-12\","+
         "    \"accountId\": 12341234,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Bank Of Happiness\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-34\""+
         "  },"+
         "  {"+
         "    \"sortCode\": \"23-54-12\","+
         "    \"accountId\": 23456123,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Royal Bank of Success\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-78\""+
         "  },"+
         "  {"+
         "    \"sortCode\": \"10-11-12\","+
         "    \"accountId\": 3245454,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Bank Of Happiness\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-34\""+
         "  },"+
         "  {"+
         "    \"sortCode\": \"23-54-12\","+
         "    \"accountId\": 12341234,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Royal Bank of Success\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-78\""+
         "  },"+
         "  {"+
         "    \"sortCode\": \"10-11-12\","+
         "    \"accountId\": 23456123,"+
         "    \"mandateStatus\": \"ACTIVE\","+
         "    \"bankName\": \"Bank Of Happiness\","+
         "    \"accountName\": \"F & J Bloggs\","+
         "    \"mandateRef\": \"12099845-34\""+
         "  }"+
         "]"
  );
  public static Map sampleMandateSearch0 =  parse.parseMap(
         "{"+
         "  \"sortCode\": \"10-11-12\","+
         "  \"searchResults\": ["+
         "    {"+
         "      \"sortCode\": \"10-11-12\","+
         "      \"accountId\": 12341234,"+
         "      \"mandateStatus\": \"ACTIVE\","+
         "      \"bankName\": \"Bank Of Happiness\","+
         "      \"accountName\": \"F & J Bloggs\","+
         "      \"mandateRef\": \"12099845-34\""+
         "    },"+
         "    {"+
         "      \"sortCode\": \"23-54-12\","+
         "      \"accountId\": 23456123,"+
         "      \"mandateStatus\": \"ACTIVE\","+
         "      \"bankName\": \"Royal Bank of Success\","+
         "      \"accountName\": \"F & J Bloggs\","+
         "      \"mandateRef\": \"12099845-78\""+
         "    },"+
         "    {"+
         "      \"sortCode\": \"10-11-12\","+
         "      \"accountId\": 3245454,"+
         "      \"mandateStatus\": \"ACTIVE\","+
         "      \"bankName\": \"Bank Of Happiness\","+
         "      \"accountName\": \"F & J Bloggs\","+
         "      \"mandateRef\": \"12099845-34\""+
         "    },"+
         "    {"+
         "      \"sortCode\": \"23-54-12\","+
         "      \"accountId\": 12341234,"+
         "      \"mandateStatus\": \"ACTIVE\","+
         "      \"bankName\": \"Royal Bank of Success\","+
         "      \"accountName\": \"F & J Bloggs\","+
         "      \"mandateRef\": \"12099845-78\""+
         "    },"+
         "    {"+
         "      \"sortCode\": \"10-11-12\","+
         "      \"accountId\": 23456123,"+
         "      \"mandateStatus\": \"ACTIVE\","+
         "      \"bankName\": \"Bank Of Happiness\","+
         "      \"accountName\": \"F & J Bloggs\","+
         "      \"mandateRef\": \"12099845-34\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleOccupationAndIncomeFullDomain0 =  parse.parseMap(
         "{"+
         "  \"mainCustomerName\": \"Mr XXXXXXXXXX J ABCD Fred Bloggs\","+
         "  \"jointCustomerName\": \"Mrs XXXXXXXXXX J ABCD Fred Bloggs\","+
         "  \"mainClientRef\": 13606326,"+
         "  \"jointClientRef\": -1,"+
         "  \"customerOccupationIncomeDetails\": ["+
         "    {"+
         "      \"areYou\": \"C\","+
         "      \"occupation\": \"W045\","+
         "      \"customerDescription\": \"XXXXXXXXX\","+
         "      \"ownShareOfTheCompany\": \"N\","+
         "      \"owningSharesPct\": \"N\","+
         "      \"workFor\": \"S.C. Bosch S.R.L.\","+
         "      \"employmentType\": \"0\","+
         "      \"empStartDate\": \"10/2002\","+
         "      \"empEndDate\": \"10/2003\","+
         "      \"annualSalaryBeforeDeduction\": 20315,"+
         "      \"annualIncomeExcludingRent\": 13255,"+
         "      \"regularCommissionBonus\": 500,"+
         "      \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "      \"whatNameBusiness\": \"XXXXXXXXX\","+
         "      \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "      \"annualDrawing3Yrs\": 100000,"+
         "      \"otherSourceOfIncome\": \"N\","+
         "      \"createdBy\": \"Seras Alin\","+
         "      \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "      \"employerName\": \"My employer name\","+
         "      \"sePositionHeld\": \"DIR\","+
         "      \"occupationCategory\": \"SK\","+
         "      \"empEmploymentSeq\": 999999,"+
         "      \"empAppRoleSeq\": 14648851,"+
         "      \"accountantAppRoleSeq\": 14648851,"+
         "      \"currentEmployment\": \"N\""+
         "    },"+
         "    {"+
         "      \"areYou\": \"E\","+
         "      \"occupation\": \"W045\","+
         "      \"customerDescription\": \"XXXXXXXXX\","+
         "      \"ownShareOfTheCompany\": \"X\","+
         "      \"owningSharesPct\": \"X\","+
         "      \"workFor\": \"S.C. Bosch S.R.L.\","+
         "      \"employmentType\": \"1\","+
         "      \"empStartDate\": \"10/2002\","+
         "      \"empEndDate\": \"10/2003\","+
         "      \"annualSalaryBeforeDeduction\": 20315,"+
         "      \"annualIncomeExcludingRent\": 13255,"+
         "      \"regularCommissionBonus\": 500,"+
         "      \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "      \"whatNameBusiness\": \"XXXXXXXXX\","+
         "      \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "      \"annualDrawing3Yrs\": 100000,"+
         "      \"otherSourceOfIncome\": \"X\","+
         "      \"createdBy\": \"Seras Alin\","+
         "      \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "      \"employerName\": \"My employer name\","+
         "      \"sePositionHeld\": \"DIR\","+
         "      \"occupationCategory\": \"SK\","+
         "      \"empEmploymentSeq\": 999999,"+
         "      \"empAppRoleSeq\": 14648851,"+
         "      \"accountantAppRoleSeq\": 14648851,"+
         "      \"currentEmployment\": \"X\""+
         "    },"+
         "    {"+
         "      \"areYou\": \"H\","+
         "      \"occupation\": \"W045\","+
         "      \"customerDescription\": \"XXXXXXXXX\","+
         "      \"ownShareOfTheCompany\": \"Y\","+
         "      \"owningSharesPct\": \"Y\","+
         "      \"workFor\": \"S.C. Bosch S.R.L.\","+
         "      \"employmentType\": \"2\","+
         "      \"empStartDate\": \"10/2002\","+
         "      \"empEndDate\": \"10/2003\","+
         "      \"annualSalaryBeforeDeduction\": 20315,"+
         "      \"annualIncomeExcludingRent\": 13255,"+
         "      \"regularCommissionBonus\": 500,"+
         "      \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "      \"whatNameBusiness\": \"XXXXXXXXX\","+
         "      \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "      \"annualDrawing3Yrs\": 100000,"+
         "      \"otherSourceOfIncome\": \"Y\","+
         "      \"createdBy\": \"Seras Alin\","+
         "      \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "      \"employerName\": \"My employer name\","+
         "      \"sePositionHeld\": \"DIR\","+
         "      \"occupationCategory\": \"SK\","+
         "      \"empEmploymentSeq\": 999999,"+
         "      \"empAppRoleSeq\": 14648851,"+
         "      \"accountantAppRoleSeq\": 14648851,"+
         "      \"currentEmployment\": \"Y\""+
         "    }"+
         "  ]"+
         "}"
  );
  public static Map sampleOccupationDescriptionResponse0 =  parse.parseMap(
         "{"+
         "  \"descTypeValue\": \"W54\","+
         "  \"descTypeName\": \"Engineer\""+
         "}"
  );
  public static List sampleOccupationsListData0 =  parse.parseList(
         "["+
         "  {"+
         "    \"descTypeValue\": \"W54\","+
         "    \"descTypeName\": \"Engineer\""+
         "  },"+
         "  {"+
         "    \"descTypeValue\": \"W54\","+
         "    \"descTypeName\": \"Engineer\""+
         "  },"+
         "  {"+
         "    \"descTypeValue\": \"W54\","+
         "    \"descTypeName\": \"Engineer\""+
         "  }"+
         "]"
  );
  public static Map sampleOneOccupationIncomeDetails0 =  parse.parseMap(
         "{"+
         "  \"areYou\": \"C\","+
         "  \"occupation\": \"W045\","+
         "  \"customerDescription\": \"XXXXXXXXX\","+
         "  \"ownShareOfTheCompany\": \"N\","+
         "  \"owningSharesPct\": \"N\","+
         "  \"workFor\": \"S.C. Bosch S.R.L.\","+
         "  \"employmentType\": \"0\","+
         "  \"empStartDate\": \"10/2002\","+
         "  \"empEndDate\": \"10/2003\","+
         "  \"annualSalaryBeforeDeduction\": 20315,"+
         "  \"annualIncomeExcludingRent\": 13255,"+
         "  \"regularCommissionBonus\": 500,"+
         "  \"whatTypeOfBusiness\": \"Electrical Technical Support\","+
         "  \"whatNameBusiness\": \"XXXXXXXXX\","+
         "  \"establishedYear\": \"2006-04-01T00:00:00.000+01:00\","+
         "  \"annualDrawing3Yrs\": 100000,"+
         "  \"otherSourceOfIncome\": \"N\","+
         "  \"createdBy\": \"Seras Alin\","+
         "  \"createdDate\": \"2007-07-03T10:52:27.000+01:00\","+
         "  \"employerName\": \"My employer name\","+
         "  \"sePositionHeld\": \"DIR\","+
         "  \"occupationCategory\": \"SK\","+
         "  \"empEmploymentSeq\": 999999,"+
         "  \"empAppRoleSeq\": 14648851,"+
         "  \"accountantAppRoleSeq\": 14648851,"+
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
  public static List sampleOverpaymentHistory0 =  parse.parseList(
         "["+
         "  {"+
         "    \"amountReceived\": 1234,"+
         "    \"date\": \"2020/10/1\","+
         "    \"status\": \"CANCELLED\""+
         "  },"+
         "  {"+
         "    \"amountReceived\": 3656734,"+
         "    \"date\": \"2021/9/1\","+
         "    \"status\": \"COLLECTED\""+
         "  },"+
         "  {"+
         "    \"amountReceived\": 1234,"+
         "    \"date\": \"2020/10/1\","+
         "    \"status\": \"CANCELLED\""+
         "  }"+
         "]"
  );
  public static Map sampleOverpaymentHistoryLine0 =  parse.parseMap(
         "{"+
         "  \"amountReceived\": 1234,"+
         "  \"date\": \"2020/10/1\","+
         "  \"status\": \"CANCELLED\""+
         "}"
  );
  public static Map sampleOverpaymentPage0 =  parse.parseMap(
         "{"+
         "  \"history\": ["+
         "    {"+
         "      \"amountReceived\": 1234,"+
         "      \"date\": \"2020/10/1\","+
         "      \"status\": \"CANCELLED\""+
         "    },"+
         "    {"+
         "      \"amountReceived\": 3656734,"+
         "      \"date\": \"2021/9/1\","+
         "      \"status\": \"COLLECTED\""+
         "    },"+
         "    {"+
         "      \"amountReceived\": 1234,"+
         "      \"date\": \"2020/10/1\","+
         "      \"status\": \"CANCELLED\""+
         "    }"+
         "  ],"+
         "  \"drawDownDate\": \"2020/10/1\","+
         "  \"initialBorrowing\": 100010"+
         "}"
  );
  public static Map samplePostCodeDataLine0 =  parse.parseMap(
         "{"+
         "  \"line1\": \"4 Privet drive\","+
         "  \"line2\": \"Little Whinging\","+
         "  \"line3\": \"Surrey\","+
         "  \"line4\": \"England\","+
         "  \"postcode\": \"LW12 5f\""+
         "}"
  );
  public static Map samplePostCodeNameAndAddress0 =  parse.parseMap(
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
         "      \"line4\": \"England\","+
         "      \"postcode\": \"LW12 5f\""+
         "    },"+
         "    {"+
         "      \"line1\": \"27 Throughput Lane\","+
         "      \"line2\": \"Woodfield\","+
         "      \"line3\": \"\","+
         "      \"line4\": \"Ireland\","+
         "      \"postcode\": \"IR45 3GT\""+
         "    },"+
         "    {"+
         "      \"line1\": \"4 Privet drive\","+
         "      \"line2\": \"Little Whinging\","+
         "      \"line3\": \"Surrey\","+
         "      \"line4\": \"England\","+
         "      \"postcode\": \"LW12 5f\""+
         "    }"+
         "  ],"+
         "  \"addressResults\": {"+
         "    \"line1\": \"4 Privet drive\","+
         "    \"line2\": \"Little Whinging\","+
         "    \"line3\": \"Surrey\","+
         "    \"line4\": \"England\","+
         "    \"postcode\": \"LW12 5f\""+
         "  }"+
         "}"
  );
  public static List samplePostCodeSearchResponse0 =  parse.parseList(
         "["+
         "  {"+
         "    \"line1\": \"4 Privet drive\","+
         "    \"line2\": \"Little Whinging\","+
         "    \"line3\": \"Surrey\","+
         "    \"line4\": \"England\","+
         "    \"postcode\": \"LW12 5f\""+
         "  },"+
         "  {"+
         "    \"line1\": \"27 Throughput Lane\","+
         "    \"line2\": \"Woodfield\","+
         "    \"line3\": \"\","+
         "    \"line4\": \"Ireland\","+
         "    \"postcode\": \"IR45 3GT\""+
         "  },"+
         "  {"+
         "    \"line1\": \"4 Privet drive\","+
         "    \"line2\": \"Little Whinging\","+
         "    \"line3\": \"Surrey\","+
         "    \"line4\": \"England\","+
         "    \"postcode\": \"LW12 5f\""+
         "  }"+
         "]"
  );
  public static List samplePrintRecordHistory0 =  parse.parseList(
         "["+
         "  {"+
         "    \"requestedBy\": \"someString\","+
         "    \"requesterDetails\": {"+
         "      \"title\": \"Mr\","+
         "      \"forename\": \"Fred\","+
         "      \"surname\": \"Bloggs\","+
         "      \"addressLine1\": \"4 Privat Drive\","+
         "      \"addressLine2\": \"Little Winging\","+
         "      \"addressLine3\": \"Surrey\","+
         "      \"addressLine4\": \"UK\","+
         "      \"postcode\": \"HG1 1FL\","+
         "      \"phone\": \"555 1234\","+
         "      \"fax\": \"5556365\""+
         "    },"+
         "    \"listOfPayments\": {"+
         "      \"standingOrders\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 1"+
         "      },"+
         "      \"openBankingStandingOrders\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 2"+
         "      },"+
         "      \"directDebits\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 3"+
         "      },"+
         "      \"billPayments\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 4"+
         "      },"+
         "      \"openBanking\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 5"+
         "      }"+
         "    },"+
         "    \"includeSingleAndInitialDirectDebits\": true,"+
         "    \"authorisedByCustomer\": \"n\""+
         "  },"+
         "  {"+
         "    \"requestedBy\": \"anotherString\","+
         "    \"requesterDetails\": {"+
         "      \"title\": \"Mrs\","+
         "      \"forename\": \"Fredrica\","+
         "      \"surname\": \"Smith\","+
         "      \"addressLine1\": \" 11 Green Acres\","+
         "      \"addressLine2\": \"Nether Wallop\","+
         "      \"addressLine3\": \"Aylesbury\","+
         "      \"addressLine4\": \"UK\","+
         "      \"postcode\": \"SO34 1DF\","+
         "      \"phone\": \"555 2344\","+
         "      \"fax\": \"555 1231\""+
         "    },"+
         "    \"listOfPayments\": {"+
         "      \"standingOrders\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 2"+
         "      },"+
         "      \"openBankingStandingOrders\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 3"+
         "      },"+
         "      \"directDebits\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 4"+
         "      },"+
         "      \"billPayments\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 5"+
         "      },"+
         "      \"openBanking\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 6"+
         "      }"+
         "    },"+
         "    \"includeSingleAndInitialDirectDebits\": false,"+
         "    \"authorisedByCustomer\": \"notyet\""+
         "  },"+
         "  {"+
         "    \"requestedBy\": \"someString\","+
         "    \"requesterDetails\": {"+
         "      \"title\": \"Mr\","+
         "      \"forename\": \"Fred\","+
         "      \"surname\": \"Bloggs\","+
         "      \"addressLine1\": \"4 Privat Drive\","+
         "      \"addressLine2\": \"Little Winging\","+
         "      \"addressLine3\": \"Surrey\","+
         "      \"addressLine4\": \"UK\","+
         "      \"postcode\": \"HG1 1FL\","+
         "      \"phone\": \"555 1234\","+
         "      \"fax\": \"5556365\""+
         "    },"+
         "    \"listOfPayments\": {"+
         "      \"standingOrders\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 3"+
         "      },"+
         "      \"openBankingStandingOrders\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 4"+
         "      },"+
         "      \"directDebits\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 5"+
         "      },"+
         "      \"billPayments\": {"+
         "        \"shouldPrint\": false,"+
         "        \"numberOfItems\": 6"+
         "      },"+
         "      \"openBanking\": {"+
         "        \"shouldPrint\": true,"+
         "        \"numberOfItems\": 1"+
         "      }"+
         "    },"+
         "    \"includeSingleAndInitialDirectDebits\": true,"+
         "    \"authorisedByCustomer\": \"y\""+
         "  }"+
         "]"
  );
  public static Map samplePrintRecordItem0 =  parse.parseMap(
         "{"+
         "  \"requestedBy\": \"someString\","+
         "  \"requesterDetails\": {"+
         "    \"title\": \"Mr\","+
         "    \"forename\": \"Fred\","+
         "    \"surname\": \"Bloggs\","+
         "    \"addressLine1\": \"4 Privat Drive\","+
         "    \"addressLine2\": \"Little Winging\","+
         "    \"addressLine3\": \"Surrey\","+
         "    \"addressLine4\": \"UK\","+
         "    \"postcode\": \"HG1 1FL\","+
         "    \"phone\": \"555 1234\","+
         "    \"fax\": \"5556365\""+
         "  },"+
         "  \"listOfPayments\": {"+
         "    \"standingOrders\": {"+
         "      \"shouldPrint\": true,"+
         "      \"numberOfItems\": 1"+
         "    },"+
         "    \"openBankingStandingOrders\": {"+
         "      \"shouldPrint\": false,"+
         "      \"numberOfItems\": 2"+
         "    },"+
         "    \"directDebits\": {"+
         "      \"shouldPrint\": true,"+
         "      \"numberOfItems\": 3"+
         "    },"+
         "    \"billPayments\": {"+
         "      \"shouldPrint\": false,"+
         "      \"numberOfItems\": 4"+
         "    },"+
         "    \"openBanking\": {"+
         "      \"shouldPrint\": true,"+
         "      \"numberOfItems\": 5"+
         "    }"+
         "  },"+
         "  \"includeSingleAndInitialDirectDebits\": true,"+
         "  \"authorisedByCustomer\": \"n\""+
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
         "  },"+
         "  {"+
         "    \"name\": \"another one line string\","+
         "    \"age\": 456"+
         "  },"+
         "  {"+
         "    \"name\": \"This is a one line string\","+
         "    \"age\": 123"+
         "  }"+
         "]"
  );
  public static Map sampleRequesterDetails0 =  parse.parseMap(
         "{"+
         "  \"title\": \"Mr\","+
         "  \"forename\": \"Fred\","+
         "  \"surname\": \"Bloggs\","+
         "  \"addressLine1\": \"4 Privat Drive\","+
         "  \"addressLine2\": \"Little Winging\","+
         "  \"addressLine3\": \"Surrey\","+
         "  \"addressLine4\": \"UK\","+
         "  \"postcode\": \"HG1 1FL\","+
         "  \"phone\": \"555 1234\","+
         "  \"fax\": \"5556365\""+
         "}"
  );
  public static Map sampleSinglePrint0 =  parse.parseMap(
         "{"+
         "  \"shouldPrint\": true,"+
         "  \"numberOfItems\": 1"+
         "}"
  );
}