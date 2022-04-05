package focuson.data.queries;
public class JointAccountQueries{
  public static  String getJointAccount(String brandId,String customerId){ 
     return
  "query{getJointAccount(" + "brandId:" + "\"" + brandId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
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