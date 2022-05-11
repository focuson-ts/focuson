package focuson.data.queries.JointAccount;
public class JointAccountQueries{
  public static  String getpreJointAccount(String accountId,String brandRef,String dbName){ 
    return"query{getpreJointAccount(" + "accountId:" + "\"" + accountId + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "dbName:" + "\"" + dbName + "\"" + "){"+
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