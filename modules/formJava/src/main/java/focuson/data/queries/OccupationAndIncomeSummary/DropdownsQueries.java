package focuson.data.queries.OccupationAndIncomeSummary;
public class DropdownsQueries{
  public static  String getDropdowns(){ 
    return"query{getDropdowns{"+
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