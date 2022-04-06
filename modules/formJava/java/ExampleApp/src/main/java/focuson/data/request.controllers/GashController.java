package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import focuson.data.Sample;
import focuson.data.db.JointAccount_jointAccountMaps;
import focuson.data.queries.AccountAllFlagsQueries;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;
import java.util.Optional;

@RestController
public class GashController {

    @Autowired
    public GraphQL graphQL;
    @Autowired
    private DataSource dataSource;

    @GetMapping(value = "/api/db", produces = "application/json")
    public String getAccountAllFlags(@RequestParam int accountId, @RequestParam int brandId) throws Exception {
        Connection c = dataSource.getConnection();
        try {
            Optional<Map<String, Object>> opt = JointAccount_jointAccountMaps.getAll(c, accountId, brandId);
            Map json = opt.get();
            return new ObjectMapper().writeValueAsString(json);
        } finally {
            c.close();
        }
    }

}