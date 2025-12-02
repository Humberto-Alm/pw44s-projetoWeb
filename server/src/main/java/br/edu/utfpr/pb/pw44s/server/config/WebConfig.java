package br.edu.utfpr.pb.pw44s.server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assetsImages/**")
                .addResourceLocations("classpath:/assetsImages/");
        registry.addResourceHandler("/mage/**")
                .addResourceLocations("classpath:/static/mage/");
        registry.addResourceHandler("/mage/**")
                .addResourceLocations("classpath:/static/mage/");
    }
}