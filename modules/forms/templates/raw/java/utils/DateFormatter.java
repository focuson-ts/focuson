package {thePackage}.{utilsPackage};

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class DateFormatter {
    public static java.sql.Date parseDate(String format, String input) {
        if (input == null) return null;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        try {
            return new java.sql.Date(simpleDateFormat.parse(input).getTime());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}