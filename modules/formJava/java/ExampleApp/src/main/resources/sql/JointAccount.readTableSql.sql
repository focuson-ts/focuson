select account.id,account.main,main.id,mainName.id,account.main,account.joint,joint.id,jointName.id,account.joint
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,CUST_TBL joint,NAME_TBL jointName
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and account.joint=joint.id and jointName.id = account.joint
select account.id,account.main,main.id,mainName.id,account.main,address.id,main.id
from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,ADD_TBL address
where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and address.id=main.id
select account.id,account.joint,joint.id,jointName.id,account.joint,address.id,joint.id
from ACC_TBL account,CUST_TBL joint,NAME_TBL jointName,ADD_TBL address
where account.id=<query.accountId> and account.joint=joint.id and jointName.id = account.joint and address.id=joint.id