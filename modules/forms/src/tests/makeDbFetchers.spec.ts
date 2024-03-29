import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { makeDBFetchers } from "../codegen/makeDBFetchers";
import { paramsForTest } from "./paramsForTest";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { postcodeRestD } from "../example/postCodeDemo/addressSearch.restD";

describe ( "makeDbFetchers", () => {
  it ( "should make the java code for the fetcher - single item", () => {
    const tables = jointAccountRestD.tables
    if ( !tables ) throw Error ( `jointAccountRestD.tables is undefined` )
    expect ( makeDBFetchers ( paramsForTest, JointAccountPageD, 'jointAccount', JointAccountPageD.rest.jointAccount, tables ) ).toEqual ( [
      " package focuson.data.dbfetchers.JointAccount;",
      "",
      "import  focuson.data.db.JointAccount.JointAccount_jointAccountMaps;",
      "import  focuson.data.fetchers.IFetcher;",
      "import  focuson.data.fetchers.JointAccount.pre_JointAccount_getpreJointAccount_FFetcher;",
      "import graphql.schema.DataFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import org.springframework.stereotype.Component;",
      "",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import java.sql.Connection;",
      "import java.util.Map;",
      "import java.util.List;",
      "import java.util.Optional;",
      "import java.util.Date;",
      "import java.text.SimpleDateFormat;",
      "",
      "  @Component",
      "public class pre_JointAccount_get_FFetcherDB implements pre_JointAccount_getpreJointAccount_FFetcher {",
      "",
      "  @Autowired",
      "  private LoggedDataSource dataSource;",
      "",
      "  public DataFetcher<Map<String,Object>> getpreJointAccount() {",
      "    return dataFetchingEnvironment -> {",
      "      int accountId = dataFetchingEnvironment.getArgument(\"accountId\");",
      "      int brandRef = dataFetchingEnvironment.getArgument(\"brandRef\");",
      "      String dbName = dataFetchingEnvironment.getArgument(\"dbName\");",
      "       Messages msgs = dataFetchingEnvironment.getLocalContext();",
      "       Connection c = dataSource.getConnection(getClass());",
      "       try {",
      "         //from the data type in JointAccount.rest[jointAccount].dataDD which is a JointAccount ",
      "         Optional<Map<String, Object>> opt = JointAccount_jointAccountMaps.getAll(c,msgs,accountId,brandRef);",
      "         if (opt.isPresent()) { ",
      "            Map json = opt.get();",
      "            return json;",
      "         } else throw new FocusonNotFound404Exception(msgs);",
      "       } finally {",
      "        dataSource.close(getClass(), c);",
      "       }",
      "    };",
      "  }",
      "",
      "  @Override",
      "  public String dbName() {",
      "      return IFetcher.db;",
      "  }",
      "}"
    ] )
  } )
  it ( "should make the java code for the fetcher - repeating item", () => {
    const tables = postcodeRestD.tables
    if ( !tables ) throw new Error ( `postcodeRestD.tables is undefined` )
    expect ( makeDBFetchers ( paramsForTest, PostCodeMainPage, 'postcode', PostCodeMainPage.rest.postcode, tables ) ).toEqual ( [
      " package focuson.data.dbfetchers.PostCodeMainPage;",
      "",
      "import  focuson.data.db.PostCodeMainPage.PostCodeMainPage_postcodeMaps;",
      "import  focuson.data.fetchers.IFetcher;",
      "import  focuson.data.fetchers.PostCodeMainPage.PostCodeSearchResponse_getPostCodeDataLine_FFetcher;",
      "import graphql.schema.DataFetcher;",
      "import org.springframework.beans.factory.annotation.Autowired;",
      "import org.springframework.stereotype.Component;",
      "",
      "import focuson.data.utils.LoggedDataSource;",
      "import focuson.data.utils.Messages;",
      "import focuson.data.utils.FocusonNotFound404Exception;",
      "import java.sql.Connection;",
      "import java.util.Map;",
      "import java.util.List;",
      "import java.util.Optional;",
      "import java.util.Date;",
      "import java.text.SimpleDateFormat;",
      "",
      "  @Component",
      "public class PostCodeSearchResponse_get_FFetcherDB implements PostCodeSearchResponse_getPostCodeDataLine_FFetcher {",
      "",
      "  @Autowired",
      "  private LoggedDataSource dataSource;",
      "",
      "  public DataFetcher<List<Map<String,Object>>> getPostCodeDataLine() {",
      "    return dataFetchingEnvironment -> {",
      "      String dbName = dataFetchingEnvironment.getArgument(\"dbName\");",
      "      String postcode = dataFetchingEnvironment.getArgument(\"postcode\");",
      "       Messages msgs = dataFetchingEnvironment.getLocalContext();",
      "       Connection c = dataSource.getConnection(getClass());",
      "       try {",
      "         //from the data type in PostCodeMainPage.rest[postcode].dataDD which is a PostCodeSearchResponse ",
      "         List<Map<String, Object>> list = PostCodeMainPage_postcodeMaps.getAll(c,msgs,postcode);",
      "         return list;",
      "       } finally {",
      "        dataSource.close(getClass(), c);",
      "       }",
      "    };",
      "  }",
      "",
      "  @Override",
      "  public String dbName() {",
      "      return IFetcher.db;",
      "  }",
      "}"
    ] )
  } )

} )