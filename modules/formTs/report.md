# All Pages
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|customerId|customerId
|brandId|brandId
|dbName|dbName
|createPlanId|createPlanId
|applRef|applRef
|brandRef|brandRef
# All endpoints
| Page | Rest | Url | Params |
| --- | --- | ---  |  --- |
|HelloWorldMainPage|restDataRD | /helloWorld?{query}.| 
|AccountOverview|accountFlags | /api/accountOverview/flags?{query}.| accountId,customerId
|AccountOverview|agreementType | /api/accountOverview/agreementType?{query}.| accountId,customerId
|AccountOverview|arrearsDetails | /api/accountOverview/arrearsDetails?{query}.| accountId,customerId,startDate
|AccountOverview|excessHistory | /api/accountOverview/excessHistory?{query}.| accountId,customerId
|AccountOverview|excessInfo | /api/accountOverview/excessInfo?{query}.| accountId,customerId
|AccountOverview|main | /api/accountOverview?{query}.| accountId,customerId
|AccountOverview|optOut | /api/accountOverview/optOut?{query}.| accountId,customerId
|AccountOverview|reason | /api/accountOverview/reason?{query}.| accountId,customerId
|JointAccount|jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName
|OccupationAndIncomeSummary|additionalInformationRD | /customer/occupation/v2/additionalInfo?{query}.| customerId
|OccupationAndIncomeSummary|businessDetailsRD | /customer/occupation/v2/businessDetails?{query}.| customerId
|OccupationAndIncomeSummary|dropdownsRD | /customer/occupation/v2/occupationDetails?{query}.| customerId
|OccupationAndIncomeSummary|occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}.| customerId
|OccupationAndIncomeSummary|otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}.| customerId
|EAccountsSummary|createPlanRestD | /api/createPlan?{query}.| accountId,createPlanId,customerId
|EAccountsSummary|eAccountsSummary | /api/accountsSummary?{query}.| accountId,customerId
|ETransfer|eTransfer | /api/eTransfers?{query}.| customerId
|CreateEAccount|eTransfer | /api/createEAccount/?{query}.| accountId,createPlanId,customerId
|ChequeCreditbooks|chequeCreditBooks | /api/chequeCreditBooks?{query}.| accountId,applRef,brandRef,customerId
|Repeating|repeating | /api/repeating?{query}.| customerId
|PostCodeMainPage|address | /api/address?{query}.| 
|PostCodeMainPage|postcode | /api/postCode?{query}.| postcode

---
#HelloWorldMainPage - MainPage
  ##domains 
    HelloWorldDomainData
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |restDataRD | /helloWorld?{query}.| 
  ##display 
    HelloWorldDomainData

---
#AccountOverview - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|customerId|customerId
  ##domains 
    AccountAllFlags
    AccountAllFlagsList
    AccountOneFlag
    AccountOverview
    AccountOverviewAgreementType
    AccountOverviewCriteria
    AccountOverviewCriteriaLine
    AccountOverviewExcessHistoryLine
    AccountOverviewExcessInfo
    AccountOverviewExcessLines
    AccountOverviewFacilities
    AccountOverviewFacilitiesLine
    AccountOverviewFacilitiesLines
    AccountOverviewHistory
    AccountOverviewOptOut
    AccountOverviewOptOutLine
    AccountOverviewOptOutLines
    AccountOverviewReason
    ArrearsDetails
    ArrearsDetailsLine
    ArrearsDetailsLines
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |accountFlags | /api/accountOverview/flags?{query}.| accountId,customerId
    |agreementType | /api/accountOverview/agreementType?{query}.| accountId,customerId
    |arrearsDetails | /api/accountOverview/arrearsDetails?{query}.| accountId,customerId,startDate
    |excessHistory | /api/accountOverview/excessHistory?{query}.| accountId,customerId
    |excessInfo | /api/accountOverview/excessInfo?{query}.| accountId,customerId
    |main | /api/accountOverview?{query}.| accountId,customerId
    |optOut | /api/accountOverview/optOut?{query}.| accountId,customerId
    |reason | /api/accountOverview/reason?{query}.| accountId,customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | ExcessInfoSearch |AccountOverviewExcessInfo
    | Reason |AccountOverviewReason
    | ExcessHistory |AccountOverviewHistory
    | ArrearsDetails |ArrearsDetails
    | AccountFlags |AccountAllFlags
    | OptOut |AccountOverviewOptOut
    | AgreementType |AccountOverviewAgreementType
  ##display 
    AccountOverview
  ##buttons 
    Modal Button ==> AgreementType in mode view
      Focused on "~/agreementType"
    Modal Button ==> ArrearsDetails in mode view
      Focused on "~/arrearsDetails"
    Modal Button ==> ExcessHistory in mode view
      Focused on "~/excessHistory"
    Modal Button ==> ExcessInfoSearch in mode view
      Focused on "~/excessInfo"
    Modal Button ==> AccountFlags in mode edit
      Copy from {"from":"~/accountFlags"}
      Focused on "~/editingAccountFlags"
      Copy on close {"to":"~/accountFlags"} 
    Modal Button ==> OptOut in mode view
      Focused on "~/optOut"
    Modal Button ==> Reason in mode view
      Focused on "~/reason"

---
#JointAccount - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|brandId|brandId
|dbName|dbName
  ##domains 
    JointAccount
    JointAccountAddress
    JointAccountAddresses
    JointAccountCustomer
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName
  ##modals  
  |name|displayed with
  | --- | --- 
    | JointAccountEditModalPage |JointAccountCustomer
  ##display 
    JointAccount
  ##buttons 
    Modal Button ==> JointAccountEditModalPage in mode edit
      Focused on "#selectedAccount"
    toggle       ToggleButton toggles ~/joint

---
#OccupationAndIncomeSummary - MainPage
## Common Params
| Name | Location
| --- | ---
|customerId|customerId
  ##domains 
    AccountDetails
    AdditionalInformation
    BusinessDetails
    BusinessDetailsMain
    BusinessFinancialDetails
    ContractTypesResponse
    CustomerOccupationIncomeDetails
    DetailsOfNonRecurringItems
    DetailsOfReevaluationOfAssets
    Dropdowns
    EmploymentStatus
    FrequenciesResponse
    ListOccupations
    OccupationAndIncomeFullDomain
    OccupationDescriptionResponse
    OccupationsListData
    OneOccupationIncomeDetails
    OtherIncomeResponse
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |additionalInformationRD | /customer/occupation/v2/additionalInfo?{query}.| customerId
    |businessDetailsRD | /customer/occupation/v2/businessDetails?{query}.| customerId
    |dropdownsRD | /customer/occupation/v2/occupationDetails?{query}.| customerId
    |occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}.| customerId
    |otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}.| customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | OccupationIncomeModal |OneOccupationIncomeDetails
    | AdditionalInformationModal |AdditionalInformation
    | BusinessDetailsModal |BusinessDetailsMain
    | OtherSourcesOfIncomeModal |OtherIncomeResponse
    | ListOccupationsModal |ListOccupations
  ##display 
    OccupationAndIncomeFullDomain
  ##buttons 
    Modal Button ==> OccupationIncomeModal in mode create
      Focused on "~/temp"
      Copy on close {"to":"#currentOccupation/[$append]"} 
    Modal Button ==> AdditionalInformationModal in mode edit
      Focused on "~/additionalInformation"
    Modal Button ==> BusinessDetailsModal in mode edit
      Focused on "~/businessDetails"
    Modal Button ==> OccupationIncomeModal in mode edit
      Copy from {"from":"#currentOccupation[#selected]"}
      Focused on "~/temp"
      Copy on close {"to":"#currentOccupation[#selected]"} 
    Modal Button ==> ListOccupationsModal in mode edit
      Copy from [{"from":"#currentOccupation[#selected]/occupation","to":"~/occupation/search"},{"from":"#currentOccupation[#selected]/occupation","to":"~/occupation/selectedOccupationName"}]
      Focused on "~/occupation"
      Copy on close [{"from":"~/occupation/selectedOccupationName","to":"#currentOccupation[#selected]/occupation"}] 
    mainOrJoint  ToggleButton toggles ~/mainOrJoint
    nextOccupation ListNextButton
    Modal Button ==> OtherSourcesOfIncomeModal in mode edit
      Focused on "~/otherSourcesOfIncome"
    prevOccupation ListPrevButton
  ##guards  
  | OneOccupationIncomeDetails|areYou|ownShareOfTheCompany|owningSharesPct|employmentType|otherSourceOfIncome
  | --- | --- | --- | --- | --- | --- 
  occupation|E,S| | | | 
  customerDescription|E,S| | | | 
  ownShareOfTheCompany|E| | | | 
  owningSharesPct|E|Y| | | 
  workFor|E| |N| | 
  employmentType|E| |N| | 
  empStartDate|E| | |1| 
  empEndDate|E| | |2,3| 
  annualSalaryBeforeDeduction|E| |N| | 
  annualIncomeExcludingRent|E| |N| | 
  regularCommissionBonus|E| |N| | 
  whatTypeOfBusiness|E,S| |Y| | 
  whatNameBusiness|E,S| |Y| | 
  establishedYear|E,S| |Y| | 
  annualDrawing3Yrs|E,S| |Y| | 
  

---
#EAccountsSummary - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|createPlanId|createPlanId
|customerId|customerId
  ##domains 
    CreatePlan
    EAccountsSummary
    EAccountsSummaryTable
    EAccountSummary
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |createPlanRestD | /api/createPlan?{query}.| accountId,createPlanId,customerId
    |eAccountsSummary | /api/accountsSummary?{query}.| accountId,customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | CreatePlan |CreatePlan
  ##display 
    EAccountsSummary
  ##buttons 
    Modal Button ==> CreatePlan in mode edit
      Copy from {"from":"~/fromApi/createPlan"}
      Focused on "~/tempCreatePlan"
      RestOnCommit: createPlanRestD/update
    Modal Button ==> CreatePlan in mode create
      Focused on "~/tempCreatePlan"
      RestOnCommit: createPlanRestD/create
    deleteExistingPlan RestButton
    refresh      ResetStateButton

---
#ETransfer - MainPage
## Common Params
| Name | Location
| --- | ---
|customerId|customerId
  ##domains 
    ETransferDataD
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |eTransfer | /api/eTransfers?{query}.| customerId
  ##display 
    ETransferDataD
  ##buttons 
    cancel       ResetStateButton
    eTransfers   RestButton
    resetAll     ResetStateButton

---
#CreateEAccount - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|createPlanId|createPlanId
|customerId|customerId
  ##domains 
    CreateEAccountData
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |eTransfer | /api/createEAccount/?{query}.| accountId,createPlanId,customerId
  ##display 
    CreateEAccountData
  ##buttons 
    cancel       ResetStateButton
    createEAccounts RestButton
    resetAll     ResetStateButton

---
#ChequeCreditbooks - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|customerId|customerId
  ##domains 
    ChequeCreditbooks
    ChequeCreditbooksHistory
    ChequeCreditbooksHistoryLine
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |chequeCreditBooks | /api/chequeCreditBooks?{query}.| accountId,applRef,brandRef,customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | OrderChequeBookOrPayingInModal |ChequeCreditbooksHistoryLine
  ##display 
    ChequeCreditbooks
  ##buttons 
    chequeBook   ResetStateButton
    Modal Button ==> OrderChequeBookOrPayingInModal in mode create
      Focused on "~/tempCreatePlan"
      RestOnCommit: chequeCreditBooks/create
    payingInBook ResetStateButton

---
#Repeating - MainPage
## Common Params
| Name | Location
| --- | ---
|customerId|customerId
  ##domains 
    RepeatingLine
    RepeatingWholeData
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |repeating | /api/repeating?{query}.| customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | RepeatingLine |RepeatingLine
  ##display 
    RepeatingWholeData displayed using Table
  ##buttons 
    Modal Button ==> RepeatingLine in mode create
      Focused on "~/temp"
      Copy on close {"to":"~/fromApi[$append]"} 
    Modal Button ==> RepeatingLine in mode edit
      Copy from [{"from":"~/fromApi[~/selectedItem]"}]
      Focused on "~/temp"
      Copy on close {"to":"~/fromApi/[~/selectedItem]"} 
    nextOccupation ListNextButton guarded by [<arrayEnd]
    prevOccupation ListPrevButton guarded by [>0]
  ##guards  
  | Repeating button | condition
  | --- | --- |
  | nextOccupation | {"condition":"<arrayEnd","arrayPath":"~/fromApi","varPath":"~/selectedItem"}}
  | prevOccupation | {"condition":">0","path":"~/selectedItem"}}

---
#PostCodeMainPage - MainPage
  ##domains 
    PostCodeData
    PostCodeDataLine
    PostCodeNameAndAddress
    PostCodeSearch
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |address | /api/address?{query}.| 
    |postcode | /api/postCode?{query}.| postcode
  ##modals  
  |name|displayed with
  | --- | --- 
    | PostCodeSearch |PostCodeSearch
  ##display 
    PostCodeNameAndAddress
  ##buttons 
    save         RestButton
    Modal Button ==> PostCodeSearch in mode edit
      Focused on "~/postcode"
      Copy on close [{"from":"~/postcode/addressResults/line1","to":"~/main/line1"},{"from":"~/postcode/addressResults/line2","to":"~/main/line2"},{"from":"~/postcode/addressResults/line3","to":"~/main/line3"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/search","to":"~/main/postcode"}] 

---