select account.blnc,mainName.zzname,account.id,account.main,main.id,mainName.id,account.joint,joint.id,jointName.id
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,CUST_TBL joint,NAME_TBL jointName
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and account.joint=joint.id and jointName.id = account.joint
select address.zzline1,address.zzline2,account.id,account.main,main.id,mainName.id,address.id
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,ADD_TBL address
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and address.id=main.id
select address.zzline1,address.zzline2,account.id,account.joint,joint.id,jointName.id,address.id
from ACC_TBL account,CUST_TBL joint,NAME_TBL jointName,ADD_TBL address
where account.id=<query.accountId> and account.joint=joint.id and jointName.id = account.joint and address.id=joint.id