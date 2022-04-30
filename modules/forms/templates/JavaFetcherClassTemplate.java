package {mockFetcherPackage};

import com.google.common.collect.ImmutableMap;
import graphql.schema.DataFetcher;
import graphql.schema.StaticDataFetcher;
import org.springframework.stereotype.Component;
import {thePackage}.{fetcherPackage}.IFetcher;
import {thisFetcherPackage}.{fetcherInterface};
import {thePackage}.Sample;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
public class {fetcherClass}  implements {fetcherInterface}{
@Override
public String dbName() {return IFetcher.mock; }

{content}
}

