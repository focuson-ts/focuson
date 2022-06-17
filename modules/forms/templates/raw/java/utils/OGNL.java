package {thePackage}.utils;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OGNL implements IOGNL {
    @Override
    public <T> T getData(Map<String, Object> json, String path, Class<T> clazz) {
        String[] split = path.split("\\.");
        Object var = json;
        for (String s : split) var = ((Map<String, Object>) var).get(s);
        return (T) var;
    }
}
