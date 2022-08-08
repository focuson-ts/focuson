package {thePackage}.{utilsPackage};

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.DataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import graphql.schema.DataFetchingEnvironment;
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
import java.util.Optional;
import {thePackage}.{fetcherPackage}.IFetcher;
import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;
import java.util.function.Function;
import java.util.stream.Collectors;

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
      if (dbName==null) dbName= IFetcher.mock;
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

   public<T extends IFetcher, Res> DataFetcher<Res> find(Class<T> clazz, List<T> list,String dbName,Function<T, DataFetcher<Res>>fn){
        List<T> result=list.stream().filter(f->f.dbName().equals(dbName)).collect(Collectors.toList());
        if(result.size()==1)return fn.apply(result.get(0));
        String names=". Had "+result.stream().map(s->s.getClass().getName()).collect(Collectors.joining(","));
        return new DataFetcher<Res>(){
            @Override
            public Res get(DataFetchingEnvironment dataFetchingEnvironment)throws Exception{
                throw new RuntimeException("Cannot find the unique fetcher for class "+ clazz.getSimpleName() + " " + dbName+ " candidates are [" + names + "]\n" +
                                           "//If this error is thrown it is often for one of the following reasons\n"+
                                           "//   Are you calling the endpoint with the correct verb? For example you have a create endpoint and you are calling it using createWithoutFetch\n"+
                                           "//   Are you calling it with dbName=db, and you haven't get implemented a back end?");
            }
        };
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
