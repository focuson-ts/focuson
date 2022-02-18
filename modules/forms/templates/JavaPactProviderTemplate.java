package com.hcl.cms.pacts;


import au.com.dius.pact.provider.junit.PactRunner;
import au.com.dius.pact.provider.junit.target.HttpTarget;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.State;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import au.com.dius.pact.provider.junitsupport.target.Target;
import au.com.dius.pact.provider.junitsupport.target.TestTarget;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(PactRunner.class) // Say JUnit to run tests with custom Runner
@Provider("{provider}}") // Set up name of tested provider
@PactFolder("acceptedPacts")
public class employmentAdditionalInformationApiProviderPactTest {

    @State(value = {"I have 1 employmentAdditionalInformation","I have a new employmentAdditionalInformation"})
    public void configureState() {
    }

    @TestTarget
    public final Target target = new HttpTarget(9024);

}
