//create table POSTCODE(
//   PC_POSTCODE integer,
//   zzline1 varchar(256),
//   zzline2 varchar(256),
//   zzline3 varchar(256),
//   zzline4 varchar(256)
// );

export const addressSearchSql = [
  `insert into POSTCODE(PC_POSTCODE, zzline1, zzline2, zzline3, zzline4)
   values ('LW23 1HQ', '4 Privet drive', 'Little Whinging', 'Surrey', 'England');`,
  `insert into POSTCODE(PC_POSTCODE, zzline1, zzline2, zzline3, zzline4)
   values ('IR12 1w4', '27 Throughput drive', 'Woodfield', 'Country Cork', 'Ireland');`

]