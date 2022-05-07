create table CUST_TBL(
  nameId integer,
  id integer
);

create table NAME_TBL(
  id integer,
  zzname varchar(255)
);

create table ACC_TBL(
  mainCustomerId integer,
  jointCustomerId integer,
  acc_id integer,
  brand_id integer,
  blnc integer
);

create table ADD_TBL(
  customerId integer,
  zzline1 varchar(255),
  zzline2 varchar(255),
  zzline3 varchar(255),
  zzline4 varchar(255)
);

create table POSTCODE(
  PC_POSTCODE varchar(255),
  zzline1 varchar(255),
  zzline2 varchar(255),
  zzline3 varchar(255),
  zzline4 varchar(255)
);
