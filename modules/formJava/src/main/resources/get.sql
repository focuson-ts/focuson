--pre JointAccount /api/jointAccount?{query} {"accountId":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","commonLens":"accountId","testValue":"accId"},"brandRef":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","commonLens":"brandRef","testValue":"brandRef"},"dbName":{"rsSetter":"setString","javaType":"String","javaParser":"","commonLens":"dbName","testValue":"mock"}}
select
  mainCustomer.nameId as mainCustomer_nameId,
  mainName.id as mainName_id,
  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,
  mainCustomer.id as mainCustomer_id,
  jointCustomer.nameId as jointCustomer_nameId,
  jointName.id as jointName_id,
  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,
  jointCustomer.id as jointCustomer_id,
  ACC_TBL.acc_id as ACC_TBL_acc_id,
  ACC_TBL.brand_id as ACC_TBL_brand_id,
  mainName.zzname as mainName_zzname,
  jointName.zzname as jointName_zzname,
  ACC_TBL.blnc as ACC_TBL_blnc
 from
  ACC_TBL ACC_TBL,
  NAME_TBL mainName,
  CUST_TBL mainCustomer,
  NAME_TBL jointName,
  CUST_TBL jointCustomer
 where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and 3=3 and 1=1 and ACC_TBL <> 'canceled';

select
  ACC_TBL.acc_id as ACC_TBL_acc_id,
  ACC_TBL.brand_id as ACC_TBL_brand_id,
  mainCustomer.id as mainCustomer_id,
  mainAddress.customerId as mainAddress_customerId,
  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,
  mainAddress.zzline1 as mainAddress_zzline1,
  mainAddress.zzline2 as mainAddress_zzline2
 from
  ACC_TBL ACC_TBL,
  CUST_TBL mainCustomer,
  ADD_TBL mainAddress
 where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id and 2=2 and 1=1;

select
  ACC_TBL.acc_id as ACC_TBL_acc_id,
  ACC_TBL.brand_id as ACC_TBL_brand_id,
  jointCustomer.id as jointCustomer_id,
  jointAddress.customerId as jointAddress_customerId,
  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,
  jointAddress.zzline1 as jointAddress_zzline1,
  jointAddress.zzline2 as jointAddress_zzline2
 from
  ACC_TBL ACC_TBL,
  CUST_TBL jointCustomer,
  ADD_TBL jointAddress
 where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id;

-- PostCodeNameAndAddress /api/address?{query} {}
select
  ADD_TBL.zzline1 as ADD_TBL_zzline1,
  ADD_TBL.zzline2 as ADD_TBL_zzline2,
  ADD_TBL.zzline3 as ADD_TBL_zzline3,
  ADD_TBL.zzline4 as ADD_TBL_zzline4
 from
  ADD_TBL ADD_TBL
 where ;

-- PostCodeSearchResponse /api/postCode?{query} {"dbName":{"rsSetter":"setString","javaType":"String","javaParser":"","commonLens":"dbName","testValue":"mock"},"postcode":{"rsSetter":"setInt","javaType":"int","javaParser":"Integer.parseInt","lens":"~/postcode/search","testValue":"LW12 4RG"}}
select
  POSTCODE.PC_POSTCODE as POSTCODE_PC_POSTCODE,
  POSTCODE.zzline1 as POSTCODE_zzline1,
  POSTCODE.zzline2 as POSTCODE_zzline2,
  POSTCODE.zzline3 as POSTCODE_zzline3,
  POSTCODE.zzline4 as POSTCODE_zzline4
 from
  POSTCODE POSTCODE
 where  POSTCODE.PC_POSTCODE = ?;
