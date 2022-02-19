package focuson.data;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@RequestMapping(value="/hello	")
	public static String Welcome() {
	    return "Welcome to Spring Boot \n" +
		"Remember to subscribe and leave a comment";
	}

}