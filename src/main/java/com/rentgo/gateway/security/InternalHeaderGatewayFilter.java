package com.rentgo.gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class InternalHeaderGatewayFilter extends AbstractGatewayFilterFactory<InternalHeaderGatewayFilter.Config> {

    public static final String HEADER_NAME = "X-Internal-Secret";
    public static final String SECRET_VALUE = "NEOXAM";

    public InternalHeaderGatewayFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(r -> r.headers(httpHeaders -> httpHeaders.add(HEADER_NAME, SECRET_VALUE)))
                    .build();
            return chain.filter(mutatedExchange);
        };
    }

    public static class Config {
    }
}
