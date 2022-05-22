# All Pages
# Critical Issues
## Critical Issues in ChequeCreditbooks
* ChequeCreditbooks.rest[chequeCreditBooks].audits is defined. These currently do absolutely nothing, and will soon cause errors. Please migrate them to mutations

---
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|dbName|dbName
|brandRef|brandRef
|clientRef|clientRef
|applRef|applRef
|createPlanId|createPlanId
|employeeType|employeeType
|customerId|customerId
# All endpoints
| Page | Rest | Url | Params | Access | Audit
| --- | --- | ---  |  --- | --- | --- |
|HelloWorldMainPage|restDataRD | /helloWorld?{query}|  |  | 
|ListOfPaymentsPage|accountDetails | /api/payment/accountDetails?{query}| accountId |  | 
|ListOfPaymentsPage|currentPayments | /api/paymentcounts?{query}| accountId |  | 
|ListOfPaymentsPage|paymentHistory | /api/printrecordhistory?{query}| accountId |  | 
|ListOfPaymentsPage| | /api/print?{query}| accountId |
|ListOfPaymentsPage|postcode | /api/listOfPayments/postCode?{query}| dbName,postcode |  | 
|LinkedAccountDetails|collectionHistoryList | /api/collections/list?{query}| accountId,clientRef |  | 
|LinkedAccountDetails|collectionSummary | /api/collections/summary?{query}| accountId,clientRef |  | 
|LinkedAccountDetails|createPayment | /api/payment/create?{query}| accountId,clientRef,paymentId |  | create->create,auditCreate
|LinkedAccountDetails|overpaymentHistory | /api/payment/overpayment/history?{query}| accountId,brandRef,clientRef |  | 
|LinkedAccountDetails|payments | /api/payment?{query}| accountId,clientRef,paymentId |  | state:cancel->auditCancel; state:revalidate->auditrevalidate
|LinkedAccountDetails| | /api/payment/cancel?{query}| accountId,clientRef,paymentId |
|LinkedAccountDetails| | /api/payment/revalidate?{query}| accountId,clientRef,paymentId |
|LinkedAccountDetails|searchMandate | /api/mandates/allForClient?{query}| clientRef |  | 
|AccountOverview|accountFlags | /api/accountOverview/flags?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|agreementType | /api/accountOverview/agreementType?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|arrearsDetails | /api/accountOverview/arrearsDetails?{query}| accountId,applRef,brandRef,clientRef,startDate |  | 
|AccountOverview|excessHistory | /api/accountOverview/excessHistory?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|excessInfo | /api/accountOverview/excessInfo?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|main | /api/accountOverview?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|optOut | /api/accountOverview/optOut?{query}| accountId,applRef,brandRef,clientRef |  | 
|AccountOverview|reason | /api/accountOverview/reason?{query}| accountId,applRef,brandRef,clientRef |  | 
|JointAccount|jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | 
|OccupationAndIncomeSummary|additionalInformationRD | /customer/occupation/v2/additionalInfo?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetCustomeAdditionalInfo
|OccupationAndIncomeSummary|businessDetailsRD | /customer/occupation/v2/businessDetails?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetBusinessDetails
|OccupationAndIncomeSummary|dropdownsRD | /customer/occupation/v2/occupationDetails?{query}|  |  | 
|OccupationAndIncomeSummary|occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetCustomerOccupation; update->auditUpdateCustomerOccupation
|OccupationAndIncomeSummary|otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}| accountId,applRef,brandRef,clientRef |  | get->auditOtherIncome
|EAccountsSummary|createPlanRestD | /api/createPlan?{query}| accountId,applRef,brandRef,clientRef,createPlanId |  | 
|EAccountsSummary|eAccountsSummary | /api/accountsSummary?{query}| accountId,applRef,brandRef,clientRef,dbName,employeeType | employeeType in teamLeader | state:invalidate->auditStuff
|EAccountsSummary| | /api/accountsSummary/invalidate?{query}| accountId,applRef,brandRef,clientRef,dbName,employeeType |
|ETransfer|eTransfer | /api/eTransfers?{query}| customerId |  | 
|ETransfer|holidays | /api/holidays|  |  | 
|CreateEAccount|eTransfer | /api/createEAccount/?{query}| accountId,applRef,brandRef,clientRef,createPlanId |  | create->updateSql,getSql; get->auditGetCheckBook; state:cancel->auditCancelCheckbook
|ChequeCreditbooks|chequeCreditBooks | /api/chequeCreditBooks?{query}| accountId,applRef,brandRef,clientRef |  | create->sequencename,auditCreateCheckBook,manualLog; get->auditGetCheckBook; state:cancel->auditCancelCheckbook
|ChequeCreditbooks| | /api/chequeCreditBooks/cancel?{query}| accountId,applRef,brandRef,clientRef |
|ChequeCreditbooks| | /api/chequeCreditBooks/revalidate?{query}| accountId,applRef,brandRef,clientRef |
|Repeating|repeating | /api/repeating?{query}| clientRef |  | 
|PostCodeMainPage|address | /api/address?{query}|  |  | 
|PostCodeMainPage|postcode | /api/postCode?{query}| dbName,postcode |  | 

---
# HelloWorldMainPage - MainPage
  ## domains 
    HelloWorldDomainData
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |restDataRD | /helloWorld?{query}|  |  | 
  ## display 
    HelloWorldDomainData

---
# ListOfPaymentsPage - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|dbName|dbName
  ## domains 
    AccountDetailsForListOfPayments
    AddressSearch
    CurrentPaymentCounts
    ListOfPayments
    NewBankDetails
    PostCodeDataLineForListOfPayments
    PostCodeSearchResponseForListOfPayments
    PrintRecordHistory
    PrintRecordItem
    RequesterDetails
    SinglePrint
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |accountDetails | /api/payment/accountDetails?{query}| accountId |  | 
    |currentPayments | /api/paymentcounts?{query}| accountId |  | 
    |paymentHistory | /api/printrecordhistory?{query}| accountId |  | 
    | | /api/print?{query}| accountId |
    |postcode | /api/listOfPayments/postCode?{query}| dbName,postcode |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | EditListOfPayments |PrintRecordItem
    | AddressModalPage |AddressSearch
  ## display 
    PrintRecordHistory displayed using SelectedItem
  ## buttons 
    Modal Button ==> EditListOfPayments in mode create
      Copy from [{"from":"~/display[~/selected]"},{"from":"~/currentPayments/standingOrders","to":"~/tempListOfPayments/listOfPayments/standingOrders/numberOfItems"},{"from":"~/currentPayments/openBankingStandingOrders","to":"~/tempListOfPayments/listOfPayments/openBankingStandingOrders/numberOfItems"},{"from":"~/currentPayments/directDebits","to":"~/tempListOfPayments/listOfPayments/directDebits/numberOfItems"},{"from":"~/currentPayments/billPayments","to":"~/tempListOfPayments/listOfPayments/billPayments/numberOfItems"},{"from":"~/currentPayments/openBanking","to":"~/tempListOfPayments/listOfPayments/openBanking/numberOfItems"}]
      Focused on "~/tempListOfPayments"
      Copy on close {"to":"~/display[$append]"} 
    Modal Button ==> EditListOfPayments in mode edit
      Copy from [{"from":"~/display[~/selected]"},{"from":"~/currentPayments/standingOrders","to":"~/tempListOfPayments/listOfPayments/standingOrders/numberOfItems"},{"from":"~/currentPayments/openBankingStandingOrders","to":"~/tempListOfPayments/listOfPayments/openBankingStandingOrders/numberOfItems"},{"from":"~/currentPayments/directDebits","to":"~/tempListOfPayments/listOfPayments/directDebits/numberOfItems"},{"from":"~/currentPayments/billPayments","to":"~/tempListOfPayments/listOfPayments/billPayments/numberOfItems"},{"from":"~/currentPayments/openBanking","to":"~/tempListOfPayments/listOfPayments/openBanking/numberOfItems"}]
      Focused on "~/tempListOfPayments"
      Copy on close {"to":"~/display[~/selected]"} 
    next         ListNextButton
    prev         ListPrevButton
    print        RestButton
  ## guards  
  | PrintRecordItem|requestedBy|alreadyPrinted
  | --- | --- | --- 
  authorisedByCustomer|N| 
  datePrinted| |true
  

---
# LinkedAccountDetails - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|brandRef|brandRef
|clientRef|clientRef
  ## domains 
    CollectionItem
    CollectionsList
    CollectionSummary
    CreatePayment
    LinkedAccountDetailsDisplay
    Mandate
    MandateList
    MandateSearch
    OverpaymentHistory
    OverpaymentHistoryLine
    OverpaymentPage
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |collectionHistoryList | /api/collections/list?{query}| accountId,clientRef |  | 
    |collectionSummary | /api/collections/summary?{query}| accountId,clientRef |  | 
    |createPayment | /api/payment/create?{query}| accountId,clientRef,paymentId |  | create->create,auditCreate
    |overpaymentHistory | /api/payment/overpayment/history?{query}| accountId,brandRef,clientRef |  | 
    |payments | /api/payment?{query}| accountId,clientRef,paymentId |  | state:cancel->auditCancel; state:revalidate->auditrevalidate
    | | /api/payment/cancel?{query}| accountId,clientRef,paymentId |
    | | /api/payment/revalidate?{query}| accountId,clientRef,paymentId |
    |searchMandate | /api/mandates/allForClient?{query}| clientRef |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | SelectMandate |MandateSearch
    | CreatePayment |CreatePayment
    | OverpaymentModalPage |OverpaymentPage
  ## display 
    LinkedAccountDetailsDisplay
  ## buttons 
    cancelPayment RestButton
    Modal Button ==> CreatePayment in mode create
      Copy from [{"from":"~/display/collectionSummary/allowance","to":"~/createPayment/allowance"},{"from":"~/display/collectionSummary/period","to":"~/createPayment/period"}]
      Focused on "~/createPayment"
      RestOnCommit: createPayment/create
    refreshMandate DeleteStateButton
    Modal Button ==> SelectMandate in mode edit
      Copy from [{"from":"~/display/mandate/sortCode","to":"~/selectMandateSearch/sortCode"},{"from":"~/display/mandate","to":"~/tempMandate"}]
      Focused on "~/selectMandateSearch"
      Copy on close {"from":"~/tempMandate","to":"~/display/mandate"} 
  ## guards  
  | CreatePayment|reasonIsAllowance
  | --- | --- 
  allowance|A
  period|A
  

---
# AccountOverview - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|clientRef|clientRef
  ## domains 
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
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |accountFlags | /api/accountOverview/flags?{query}| accountId,applRef,brandRef,clientRef |  | 
    |agreementType | /api/accountOverview/agreementType?{query}| accountId,applRef,brandRef,clientRef |  | 
    |arrearsDetails | /api/accountOverview/arrearsDetails?{query}| accountId,applRef,brandRef,clientRef,startDate |  | 
    |excessHistory | /api/accountOverview/excessHistory?{query}| accountId,applRef,brandRef,clientRef |  | 
    |excessInfo | /api/accountOverview/excessInfo?{query}| accountId,applRef,brandRef,clientRef |  | 
    |main | /api/accountOverview?{query}| accountId,applRef,brandRef,clientRef |  | 
    |optOut | /api/accountOverview/optOut?{query}| accountId,applRef,brandRef,clientRef |  | 
    |reason | /api/accountOverview/reason?{query}| accountId,applRef,brandRef,clientRef |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | ExcessInfoSearch |AccountOverviewExcessInfo
    | Reason |AccountOverviewReason
    | ExcessHistory |AccountOverviewHistory
    | ArrearsDetails |ArrearsDetails
    | AccountFlags |AccountAllFlags
    | OptOut |AccountOverviewOptOut
    | AgreementType |AccountOverviewAgreementType
  ## display 
    AccountOverview
  ## buttons 
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
# JointAccount - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|brandRef|brandRef
|dbName|dbName
  ## domains 
    JointAccount
    JointAccountAddress
    JointAccountAddresses
    JointAccountCustomer
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | JointAccountEditModalPage |JointAccountCustomer
  ## display 
    JointAccount
  ## buttons 
    Modal Button ==> JointAccountEditModalPage in mode edit
      Focused on "#selectedAccount"
    toggle       ToggleButton toggles ~/joint
  ## dataMapping
  ## Table CUST_TBL (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  
  ## Table NAME_TBL (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  | main,name  |  zzname 
  
  ## Table ACC_TBL (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  | balance  |  blnc 
  
  ## Table ADD_TBL (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  | main,addresses,line1  |  zzline1 
  | main,addresses,line2  |  zzline2 
  

---
# OccupationAndIncomeSummary - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|clientRef|clientRef
  ## domains 
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
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |additionalInformationRD | /customer/occupation/v2/additionalInfo?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetCustomeAdditionalInfo
    |businessDetailsRD | /customer/occupation/v2/businessDetails?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetBusinessDetails
    |dropdownsRD | /customer/occupation/v2/occupationDetails?{query}|  |  | 
    |occupationAndIncomeRD | /customer/occupation/v2/occupationIncomeDetails?{query}| accountId,applRef,brandRef,clientRef |  | get->auditGetCustomerOccupation; update->auditUpdateCustomerOccupation
    |otherSourcesOfIncomeRD | /customer/occupation/v2/otherIncome?{query}| accountId,applRef,brandRef,clientRef |  | get->auditOtherIncome
  ## modals  
  |name|displayed with
  | --- | --- 
    | OccupationIncomeModal |OneOccupationIncomeDetails
    | AdditionalInformationModal |AdditionalInformation
    | BusinessDetailsModal |BusinessDetailsMain
    | OtherSourcesOfIncomeModal |OtherIncomeResponse
    | ListOccupationsModal |ListOccupations
  ## display 
    OccupationAndIncomeFullDomain
  ## buttons 
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
  ## guards  
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
# EAccountsSummary - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|clientRef|clientRef
|createPlanId|createPlanId
|dbName|dbName
|employeeType|employeeType
  ## domains 
    CreatePlan
    EAccountsSummary
    EAccountsSummaryTable
    EAccountSummary
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |createPlanRestD | /api/createPlan?{query}| accountId,applRef,brandRef,clientRef,createPlanId |  | 
    |eAccountsSummary | /api/accountsSummary?{query}| accountId,applRef,brandRef,clientRef,dbName,employeeType | employeeType in teamLeader | state:invalidate->auditStuff
    | | /api/accountsSummary/invalidate?{query}| accountId,applRef,brandRef,clientRef,dbName,employeeType |
  ## modals  
  |name|displayed with
  | --- | --- 
    | CreatePlan |CreatePlan
  ## display 
    EAccountsSummary
  ## buttons 
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
# ETransfer - MainPage
## Common Params
| Name | Location
| --- | ---
|customerId|customerId
  ## domains 
    ETransferDataD
    HolidayData
    SingleHoliday
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |eTransfer | /api/eTransfers?{query}| customerId |  | 
    |holidays | /api/holidays|  |  | 
  ## display 
    ETransferDataD
  ## buttons 
    cancel       ResetStateButton
    eTransfers   RestButton
    resetAll     ResetStateButton

---
# CreateEAccount - MainPage
## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|clientRef|clientRef
|createPlanId|createPlanId
  ## domains 
    CreateEAccountData
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |eTransfer | /api/createEAccount/?{query}| accountId,applRef,brandRef,clientRef,createPlanId |  | create->updateSql,getSql; get->auditGetCheckBook; state:cancel->auditCancelCheckbook
  ## display 
    CreateEAccountData
  ## buttons 
    cancel       ResetStateButton
    createEAccounts RestButton
    resetAll     ResetStateButton

---
# ChequeCreditbooks - MainPage
ChequeCreditbooks.rest[chequeCreditBooks].audits is defined. These currently do absolutely nothing, and will soon cause errors. Please migrate them to mutations

## Common Params
| Name | Location
| --- | ---
|accountId|accountId
|applRef|applRef
|brandRef|brandRef
|clientRef|clientRef
  ## domains 
    ChequeCreditbooks
    ChequeCreditbooksHistory
    ChequeCreditbooksHistoryLine
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |chequeCreditBooks | /api/chequeCreditBooks?{query}| accountId,applRef,brandRef,clientRef |  | create->sequencename,auditCreateCheckBook,manualLog; get->auditGetCheckBook; state:cancel->auditCancelCheckbook
    | | /api/chequeCreditBooks/cancel?{query}| accountId,applRef,brandRef,clientRef |
    | | /api/chequeCreditBooks/revalidate?{query}| accountId,applRef,brandRef,clientRef |
  ## modals  
  |name|displayed with
  | --- | --- 
    | OrderChequeBookOrPayingInModal |ChequeCreditbooksHistoryLine
  ## display 
    ChequeCreditbooks
  ## buttons 
    cancelCheckBook RestButton
    Modal Button ==> OrderChequeBookOrPayingInModal in mode create
      Focused on "~/tempCreatePlan"
      RestOnCommit: chequeCreditBooks/create
    refresh      DeleteStateButton

---
# Repeating - MainPage
## Common Params
| Name | Location
| --- | ---
|clientRef|clientRef
  ## domains 
    RepeatingLine
    RepeatingWholeData
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |repeating | /api/repeating?{query}| clientRef |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | RepeatingLine |RepeatingLine
  ## display 
    RepeatingWholeData displayed using Table
  ## buttons 
    Modal Button ==> RepeatingLine in mode create
      Focused on "~/temp"
      Copy on close {"to":"~/fromApi[$append]"} 
    Modal Button ==> RepeatingLine in mode edit
      Copy from [{"from":"~/fromApi[~/selectedItem]"}]
      Focused on "~/temp"
      Copy on close {"to":"~/fromApi/[~/selectedItem]"} 
    nextOccupation ListNextButton guarded by [<arrayEnd]
    prevOccupation ListPrevButton guarded by [>0]
  ## guards  
  | Repeating button | condition
  | --- | --- |
  | nextOccupation | {"condition":"<arrayEnd","arrayPath":"~/fromApi","varPath":"~/selectedItem"}}
  | prevOccupation | {"condition":">0","path":"~/selectedItem"}}

---
# PostCodeMainPage - MainPage
## Common Params
| Name | Location
| --- | ---
|dbName|dbName
  ## domains 
    PostCodeDataLine
    PostCodeNameAndAddress
    PostCodeSearch
    PostCodeSearchResponse
  ## rests   
  |name|url|params|access|audit
  | --- | --- | --- | --- | --- 
    |address | /api/address?{query}|  |  | 
    |postcode | /api/postCode?{query}| dbName,postcode |  | 
  ## modals  
  |name|displayed with
  | --- | --- 
    | PostCodeSearch |PostCodeSearch
  ## display 
    PostCodeNameAndAddress
  ## buttons 
    save         RestButton
    Modal Button ==> PostCodeSearch in mode edit
      Focused on "~/postcode"
      Copy on close [{"from":"~/postcode/addressResults/line1","to":"~/main/line1"},{"from":"~/postcode/addressResults/line2","to":"~/main/line2"},{"from":"~/postcode/addressResults/line3","to":"~/main/line3"},{"from":"~/postcode/addressResults/line4","to":"~/main/line4"},{"from":"~/postcode/addressResults/postcode","to":"~/main/postcode"}] 
  ## dataMapping
  ## Table POSTCODE (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  | line1  |  zzline1 
  | line2  |  zzline2 
  | line3  |  zzline3 
  | line4  |  zzline4 
  | postcode  |  PC_POSTCODE 
  
  ## Table ADD_TBL (Schema TheSchema)
  |Display path | Database Field
  | --- | --- |
  | line1  |  zzline1 
  | line2  |  zzline2 
  | line3  |  zzline3 
  | line4  |  zzline4 
  

---