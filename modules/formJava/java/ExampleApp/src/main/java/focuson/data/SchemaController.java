package focuson.data;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import org.springframework.boot.json.JsonParser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.net.URL;
@RestController
public class SchemaController {
    @RequestMapping(value = "/api/schema", produces = "application/json")
    public String Schema() throws IOException {
        URL url = Resources.getResource("someSchema.graphql");
        return Resources.toString(url, Charsets.UTF_8);
    }
}