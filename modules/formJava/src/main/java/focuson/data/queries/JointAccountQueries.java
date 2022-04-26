package focuson.data.queries;
public class JointAccountQueries{
  public static  String getJointAccount(String accountId,String brandId,String dbName){ 
     return
  "query{getJointAccount(" + "accountId:" + "\"" + accountId + "\""  + "," + "brandId:" + "\"" + brandId + "\""  + "," + "dbName:" + "\"" + dbName + "\"" + "){"+
        "    balance"+
        "    main{"+
        "      name"+
        "      addresses{"+
        "        line1"+
        "        line2"+
        "      }"+
        "    }"+
        "    joint{"+
        "      name"+
        "      addresses{"+
        "        line1"+
        "        line2"+
        "      }"+
        "    }"+
        "  }"
  +"}";}
}