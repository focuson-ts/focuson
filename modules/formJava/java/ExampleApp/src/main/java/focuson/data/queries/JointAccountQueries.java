package focuson.data.queries;
public class JointAccountQueries{
  public static  String getJointAccount(String accountId,String brandId){ 
     return
  "query{getJointAccount(" + "accountId:" + "\"" + accountId + "\""  + "," + "brandId:" + "\"" + brandId + "\"" + "){"+
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