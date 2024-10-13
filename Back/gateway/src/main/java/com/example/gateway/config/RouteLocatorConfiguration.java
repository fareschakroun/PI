package com.example.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

public class RouteLocatorConfiguration {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                .route(p -> p
                        .path("/socket/**")
                        .filters(f -> f
                                .addResponseHeader("Access-Control-Allow-Origin", "*")
                                .addResponseHeader("Access-Control-Allow-Headers", "*"))
                        .uri("lb://localhost:8763/socket")

                )

                .build();
    }
}
