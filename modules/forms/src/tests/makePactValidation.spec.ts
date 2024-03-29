import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { makePactValidation } from "../codegen/makePactValidation";
import { paramsForTest } from "./paramsForTest";

describe ( "makePactValidation", () => {
  it ( "should make a pact validation for each page", () => {
    expect ( makePactValidation ( paramsForTest, 8080, JointAccountPageD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "package focuson.data;",
      "import au.com.dius.pact.provider.junit.PactRunner;",
      "import au.com.dius.pact.provider.junit.target.HttpTarget;",
      "import au.com.dius.pact.provider.junitsupport.Provider;",
      "import au.com.dius.pact.provider.junitsupport.State;",
      "import au.com.dius.pact.provider.junitsupport.VerificationReports;",
      "import au.com.dius.pact.provider.junitsupport.loader.PactFolder;",
      "import au.com.dius.pact.provider.junitsupport.target.Target;",
      "import au.com.dius.pact.provider.junitsupport.target.TestTarget;",
      "import org.junit.BeforeClass;",
      "import org.junit.ClassRule;",
      "import org.junit.Test;",
      "import org.junit.runner.RunWith;",
      "",
      "@RunWith(PactRunner.class)",
      "@Provider('JointAccountProvider')",
      "@PactFolder('acceptedPacts')",
      "@VerificationReports({'console', 'markdown', 'json'})",
      "public class JointAccountProviderTest {",
      "",
      "  @State(value = {'default'})",
      "  public void configureState() {",
      "  }",
      "",
      "  @TestTarget",
      "  public final Target target = new HttpTarget(8080);",
      "",
      "}"
    ])

  } )
} )