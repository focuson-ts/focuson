package focuson.data;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
 public  class CorsConfig {
 
  @Bean
  public CorsFilter corsFilter ( )  {
    UrlBasedCorsConfigurationSource source =  new UrlBasedCorsConfigurationSource ( ) ;
    CorsConfiguration corsConfiguration =  new CorsConfiguration ( ) ;
 
    corsConfiguration. setAllowedOrigins ( Arrays.asList (  CorsConfiguration.ALL  ) ) ;
    corsConfiguration. setAllowedMethods ( Arrays.asList ( CorsConfiguration.ALL ) ) ;
    corsConfiguration. setAllowedHeaders ( Arrays.asList ( CorsConfiguration.ALL ) ) ;
    source.registerCorsConfiguration ( "/**" , corsConfiguration ) ; 
    return  new CorsFilter ( source ) ; 
  } 
}