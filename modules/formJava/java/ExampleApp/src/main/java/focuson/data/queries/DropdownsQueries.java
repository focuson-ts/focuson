package focuson.data.queries;
public class DropdownsQueries{
  public static  String getDropdowns(String customerId){ 
     return
  "query{getDropdowns(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    occupationDescriptionResponse{"+
        "      descTypeValue"+
        "      descTypeName"+
        "    }"+
        "    employmentStatus{"+
        "      employmentName"+
        "      employmentValue"+
        "    }"+
        "    contractTypesResponse{"+
        "      contractTypeId"+
        "      description"+
        "    }"+
        "    frequenciesResponse{"+
        "      frequencyId"+
        "      frequencyDescription"+
        "      annualMultiple"+
        "    }"+
        "  }"
  +"}";}
}