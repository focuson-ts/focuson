package {thePackage}.utils;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class RealTimeService implements ITimeService{

    @Override
    public Date now() {
        return new Date();
    }
}
