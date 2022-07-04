package {thePackage}.{utilsPackage};

import graphql.execution.ExecutionStepInfo;
import graphql.schema.DataFetchingEnvironment;

public class GraphQlUtils {

    public static <T> T getData(DataFetchingEnvironment e, String name) {
        Object result = getData(e.getExecutionStepInfo(), name);
//        if (result != null && !clazz.isAssignableFrom(result.getClass()))
//            throw new ClassCastException("For parameter" + name + " from the data fetching environment. Expected " + clazz.getSimpleName() + " but was " + result.getClass() +
//                    " The value was " + result);
        return (T) result;
    }

    public static Object getData(ExecutionStepInfo s, String name) {
        Object result = s.getArgument(name);
        if (result != null) return result;
        if (s.hasParent()) return getData(s.getParent(), name);
        return null;
    }
}
