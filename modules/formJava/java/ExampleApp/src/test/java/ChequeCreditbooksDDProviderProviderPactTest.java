
import au.com.dius.pact.provider.junit.PactRunner;
import au.com.dius.pact.provider.junit.target.HttpTarget;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.State;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import au.com.dius.pact.provider.junitsupport.target.Target;
import au.com.dius.pact.provider.junitsupport.target.TestTarget;
import org.junit.runner.RunWith;

@RunWith(PactRunner.class)
@Provider("ChequeCreditbooksDDProvider")
@PactFolder("acceptedPacts")
public class ChequeCreditbooksDDProviderProviderPactTest {

    @State(value = {"default"})
    public void configureState() {
    }

    @TestTarget
    public final Target target = new HttpTarget();

}
