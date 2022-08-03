package {thePackage}.{utilsPackage};

import java.util.Map;

public interface IOGNL {
    <T> T getData(Map<String,Object> json, String path, Class<T> clazz);
    String getStringOr(Map<String, Object> json, String path, String ifNull);
}
