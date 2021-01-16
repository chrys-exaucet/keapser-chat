package com.keasperchat.authentification.configuration;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .groupName("V1")
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.keasperchat.authentification"))
            .paths(PathSelectors.any())
            .build()
            .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
            "Keapser Chat - Authentication Service - RESTful API",
            "Exposing  REST endpoints for users management",
            "v1.0",
            "Not yet defined",
            new Contact("Salomon DAHOUN", "https://github.com/salomon-dhn", "salomondahoun@yahoo.fr"),
            "CC BY-SA 3.0",
            "https://creativecommons.org/licenses/by-sa/3.0/",
            Collections.emptyList());
    }

}