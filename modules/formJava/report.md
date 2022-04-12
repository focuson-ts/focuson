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
|AccountOverview|arrearsDetailsCurrent | /api/accountOverview/arrearsDetails/current?{query}.| accountId,customerId,startDate
|AccountOverview|arrearsDetailsPrevious | /api/accountOverview/arrearsDetails/previous?{query}.| accountId,customerId,startDate
|AccountOverview|excessHistory | /api/accountOverview/excessHistory?{query}.| accountId,customerId
|AccountOverview|excessInfo | /api/accountOverview/excessInfo?{query}.| accountId,customerId
|AccountOverview|main | /api/accountOverview?{query}.| accountId,customerId
|AccountOverview|reason | /api/accountOverview/reason?{query}.| accountId,customerId
|JointAccount|jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName
|MainOccupationDetailsPageSummary|additionalInfoFirstRD | /customer/occupation/v2/additionalInfoFirst?{query}.| customerId
|MainOccupationDetailsPageSummary|additionalInfoSecondRD | /customer/occupation/v2/additionalInfoSecond?{query}.| customerId
|MainOccupationDetailsPageSummary|occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}.| customerId
|MainOccupationDetailsPageSummary|occupationsListRD | /customer/occupation/v2/occupationsList?{query}.| customerId
|MainOccupationDetailsPageSummary|otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}.| customerId
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
  # modals - None
  ##display 
    HelloWorldDomainData
  # buttons - None

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
    AccountOverviewCriteria
    AccountOverviewCriteriaLine
    AccountOverviewExcessHistoryLine
    AccountOverviewExcessInfo
    AccountOverviewExcessLines
    AccountOverviewHistory
    AccountOverviewReason
    ArrearsDetails
    ArrearsDetailsLine
    ArrearsDetailsLines
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |accountFlags | /api/accountOverview/flags?{query}.| accountId,customerId
    |arrearsDetailsCurrent | /api/accountOverview/arrearsDetails/current?{query}.| accountId,customerId,startDate
    |arrearsDetailsPrevious | /api/accountOverview/arrearsDetails/previous?{query}.| accountId,customerId,startDate
    |excessHistory | /api/accountOverview/excessHistory?{query}.| accountId,customerId
    |excessInfo | /api/accountOverview/excessInfo?{query}.| accountId,customerId
    |main | /api/accountOverview?{query}.| accountId,customerId
    |reason | /api/accountOverview/reason?{query}.| accountId,customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | ExcessInfoSearch |AccountOverviewExcessInfo
    | Reason |AccountOverviewReason
    | ExcessHistory |AccountOverviewHistory
    | ArrearsDetails |ArrearsDetails
    | AccountFlags |AccountAllFlags
  ##display 
    AccountOverview
  ##buttons 
    Modal Button ==> ExcessHistory in mode view
      Focused on "~/excessHistory"
    Modal Button ==> ExcessInfoSearch in mode view
      Focused on "~/excessInfo"
    Modal Button ==> AccountFlags in mode edit
      Copy from {"from":"~/accountFlags"}
      Focused on "~/editingAccountFlags"
      Copy on close {"to":"~/accountFlags"} 
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
    toggle       ToggleButton

---
#MainOccupationDetailsPageSummary - MainPage
## Common Params
| Name | Location
| --- | ---
|customerId|customerId
  ##domains 
    AdditionalInfoFirst
    AdditionalInfoSecond
    FromApi
    ListOccupations
    OccupationAndIncomeFullDomain
    OneOccupationIncomeDetails
    OtherIncomeResponse
  ##rests   
  |name|url|params
  | --- | --- | --- 
    |additionalInfoFirstRD | /customer/occupation/v2/additionalInfoFirst?{query}.| customerId
    |additionalInfoSecondRD | /customer/occupation/v2/additionalInfoSecond?{query}.| customerId
    |occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}.| customerId
    |occupationsListRD | /customer/occupation/v2/occupationsList?{query}.| customerId
    |otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}.| customerId
  ##modals  
  |name|displayed with
  | --- | --- 
    | OccupationIncomeModal |OneOccupationIncomeDetails
    | AdditionalInfoFirstModal |AdditionalInfoFirst
    | AdditionalInfoSecondModal |AdditionalInfoSecond
    | OtherSourcesOfIncomeModal |OtherIncomeResponse
    | ListOccupationsModal |ListOccupations
  ##display 
    OccupationAndIncomeFullDomain
  ##buttons 
    Modal Button ==> OccupationIncomeModal in mode edit
      Copy from {"from":"~/fromApi/occupationAndIncome/customerOccupationIncomeDetails"}
      Focused on "~/tempForOccupationEdit"
      Copy on close {"to":"~/fromApi/occupationAndIncome/customerOccupationIncomeDetails"} 

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
  # modals - None
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
  # modals - None
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
      Copy from {"from":"~/main/postcode","to":"~/postcode/search"}
      Focused on "~/postcode"
      Copy on close [{"from":"~/postcode/addressResults/line1","to":"~/main/line1"},{"from":"~/postcode/addressResults/line2","to":"~/main/line2"},{"from":"~/postcode/addressResults/line3","to":"~/main/line3"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/search","to":"~/main/postcode"}] 

---