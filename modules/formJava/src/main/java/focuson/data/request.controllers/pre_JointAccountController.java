package focuson.data.request.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import focuson.data.Sample;
import focuson.data.queries.JointAccount.JointAccountQueries;
import focuson.data.IManyGraphQl;
import focuson.data.fetchers.IFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Connection;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import focuson.data.db.JointAccount_jointAccountMaps ; 

  @RestController
  public class pre_JointAccountController {

  @Autowired
  public IManyGraphQl graphQL;
  @Autowired
  public DataSource dataSource;
    @GetMapping(value="/api/jointAccount", produces="application/json")
    public ResponseEntity getJointAccount(@RequestParam String accountId, @RequestParam String brandRef, @RequestParam String dbName) throws Exception{
        try (Connection connection = dataSource.getConnection()) {
          return Transform.result(connection,graphQL.get(dbName),JointAccountQueries.getpreJointAccount(accountId, brandRef, dbName), "getpreJointAccount");
        }
    }

    @GetMapping(value="/api/jointAccount/query", produces="application/json")
    public String querygetpreJointAccount(@RequestParam String accountId, @RequestParam String brandRef, @RequestParam String dbName) throws Exception{
       return JointAccountQueries.getpreJointAccount(accountId, brandRef, dbName);
    }

  @GetMapping(value = "/api/jointAccount/sample", produces = "application/json")
    public static String sampleJointAccount() throws Exception {
      return new ObjectMapper().writeValueAsString( Sample.sampleJointAccount0);
    }
  @GetMapping(value = "/api/jointAccount/sql", produces = "text/html")
    public static String sqlJointAccount() throws Exception {
      return JointAccount_jointAccountMaps.allSql;
    }
  }