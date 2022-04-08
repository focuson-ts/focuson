package {thePackage};

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.DataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import {thePackage}.{fetcherPackage}.IFetcher;
import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;
{imports}


@Component
public class {wiringClass}  implements IManyGraphQl{

{fetchers}
   private String sdl;
   private Map<String, GraphQL> cache = Collections.synchronizedMap(new HashMap<>()); //sucks and need to improve
   @PostConstruct
    public void init() throws IOException {
       URL url = Resources.getResource("someSchema.graphql");
       sdl = Resources.toString(url, Charsets.UTF_8);
    }

   @Override
   public GraphQL get(String dbName) {
        if (!cache.containsKey(dbName)) {
        GraphQLSchema graphQLSchema = buildSchema(dbName);
        cache.put(dbName, GraphQL.newGraphQL(graphQLSchema).build());
        }
        return cache.get(dbName);
    }

   private GraphQLSchema buildSchema(String dbName) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring(dbName);
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
   }

   public <T extends IFetcher> T find(List<T> list, String dbName) {
        return list.stream().filter(f -> f.dbName() == dbName).findFirst().get();
   }

   private RuntimeWiring buildWiring(String dbName) {
       return RuntimeWiring.newRuntimeWiring()
{wiring}
       .build();
    }

    @Bean
    public GraphQL graphQL() {
        return get(IFetcher.mock);
    }

}
