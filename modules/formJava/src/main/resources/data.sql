INSERT INTO CUST_TBL (nameId, id) values
                                      (101, 1001),
                                      (102, 1002),
                                      (103, 1003),
                                      (104, 2001),
                                      (105, 2002),
                                      (106, 2003);

INSERT INTO NAME_TBL(id, zzname) values
                                     (101, 'name One'),
                                     (102, 'name Two'),
                                     (103, 'name Three'),
                                     (104, 'name Four'),
                                     (105, 'name Five'),
                                     (106, 'name Six');

INSERT INTO ACC_TBL (mainCustomerId, jointCustomerId, acc_id, brand_id, blnc) values
                                                                                  (1001, 2001, 1, 111, 1000),
                                                                                  (1002, 2002, 2, 222, 2000),
                                                                                  (1003, 2003, 3, 333, 3000);

INSERT INTO ADD_TBL(customerId, zzline1, zzline2, zzline3, zzline4) values
                                                                        (1001, 'oneLineOne',   'oneLineTwo',   'oneLineThree',   'oneLineFour'),
                                                                        (1002, 'twoLineOne',   'twoLineTwo',   'twoLineThree',   'twoLineFour'),
                                                                        (1003, 'threeLineOne', 'threeLineTwo', 'threeLineThree', 'threeLineFour'),
                                                                        (2001, 'fourLineOne',  'fourLineTwo',  'fourLineThree',  'fourLineFour'),
                                                                        (2002, 'fiveLineOne',  'fiveLineTwo',  'fiveLineThree',  'fiveLineFour'),
                                                                        (2002, 'sixLineOne',   'sixLineTwo',   'sixLineThree',   'sixLineFour');