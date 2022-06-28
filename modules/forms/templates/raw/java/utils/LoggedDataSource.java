package {thePackage}.{utilsPackage};

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@Component
public class LoggedDataSource {
    @Value("${connection.debug:false}")
    private boolean debug;
    @Autowired
    public DataSource source;
    private AtomicInteger count = new AtomicInteger();

    public Connection getConnection(Class<?> clazz) throws SQLException {
        Logger log = LoggerFactory.getLogger(clazz.getName());
        if (debug) log.info("Get connection for " + clazz.getSimpleName() + " " + count.incrementAndGet());
        Connection connection = source.getConnection();
        if (debug) log.info("Acquired connection for " + clazz.getSimpleName() + " " + count.get());
        return connection;
    }

    public void close(Class<?> clazz, Connection connection) throws SQLException {
        Logger log = LoggerFactory.getLogger(clazz.getName());
        if (debug) log.info("Closing connection for  " + clazz.getSimpleName());
        connection.close();
        if (debug) log.info("Closed connection for  " + clazz.getSimpleName() + " " + count.getAndDecrement());
    }
}