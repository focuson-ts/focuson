import { MainPageD, RefD } from "../common/pageD";
import { JavaWiringParams } from "./config";
import { providerName, providerPactClassName } from "./names";

export function makePactValidation<B, G> ( params: JavaWiringParams, port: number, page: RefD<G> ) {
  return [
    `package ${params.thePackage};`,
    `import au.com.dius.pact.provider.junit.PactRunner;`,
    `import au.com.dius.pact.provider.junit.target.HttpTarget;`,
    `import au.com.dius.pact.provider.junitsupport.Provider;`,
    `import au.com.dius.pact.provider.junitsupport.State;`,
    `import au.com.dius.pact.provider.junitsupport.VerificationReports;`,
    `import au.com.dius.pact.provider.junitsupport.loader.PactFolder;`,
    `import au.com.dius.pact.provider.junitsupport.target.Target;`,
    `import au.com.dius.pact.provider.junitsupport.target.TestTarget;`,
    `import org.junit.BeforeClass;`,
    `import org.junit.ClassRule;`,
    `import org.junit.Test;`,
    `import org.junit.runner.RunWith;`,
    ``,
    `@RunWith(PactRunner.class)`,
    `@Provider("${providerName ( page )}")`,
    `@PactFolder("acceptedPacts")`,
    `@VerificationReports({"console", "markdown", "json"})`,
    `public class ${providerPactClassName ( page )} {`,
    ``,
    `  @State(value = {"default"})`,
    `  public void configureState() {`,
    `  }`,
    ``,
    `  @TestTarget`,
    `  public final Target target = new HttpTarget(${port});`,
    ``,
    `}`
  ]
}