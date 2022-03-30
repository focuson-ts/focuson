select account.blnc as account_blnc,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,account.id as account_id,account.main as account_main,main.id as main_id,mainName.id as mainName_id,account.joint as account_joint,joint.id as joint_id,jointName.id as jointName_id
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,CUST_TBL joint,NAME_TBL jointName
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and account.joint=joint.id and jointName.id = account.joint
select address.zzline1 as address_zzline1,address.zzline2 as address_zzline2,account.id as account_id,account.main as account_main,main.id as main_id,mainName.id as mainName_id,address.id as address_id
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,ADD_TBL address
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and address.id=main.id
select address.zzline1 as address_zzline1,address.zzline2 as address_zzline2,account.id as account_id,account.joint as account_joint,joint.id as joint_id,jointName.id as jointName_id,address.id as address_id
from ACC_TBL account,CUST_TBL joint,NAME_TBL jointName,ADD_TBL address
where account.id=<query.accountId> and account.joint=joint.id and jointName.id = account.joint and address.id=joint.id