package

{thePackage}.{utilsPackage};

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OGNL implements IOGNL {
    @Override
    public <T> T getData(Map<String, Object> json, String path, Class<T> clazz) {
        String[] split = path.split("\\.");
        Object var = json;
        for (String s : split) var = var == null ? null : ((Map<String, Object>) var).get(s);
        return (T) var;
    }

    @Override
    public String getStringOr(Map<String, Object> json, String path, String ifNull) {
        String[] split = path.split("\\.");
        Object var = json;
        for (String s : split) var = var == null ? null : ((Map<String, Object>) var).get(s);
        return var == null ? ifNull : (String) var;
    }
}
