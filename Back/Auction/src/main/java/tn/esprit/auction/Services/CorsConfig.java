package tn.esprit.auction.Services;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class CorsConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**")
//                .allowedOrigins("http://localhost:4203","*","http://localhost:4201")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//                //.allowCredentials(true); // Autorise les cookies
//    }
}
