package br.edu.utfpr.pb.pw44s.server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class MelhorEnvioDTO {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {
        private From from;
        private To to;
        private List<ProductInfo> products;
    }

    @Data
    @AllArgsConstructor
    public static class From {
        @JsonProperty("postal_code")
        private String postalCode;
    }

    @Data
    @AllArgsConstructor
    public static class To {
        @JsonProperty("postal_code")
        private String postalCode;
    }

    @Data
    @AllArgsConstructor
    public static class ProductInfo {
        private String id;
        private int width;
        private int height;
        private int length;
        private double weight;
        @JsonProperty("insurance_value")
        private double insuranceValue; // Valor do seguro
        private int quantity;
    }

    @Data
    @NoArgsConstructor
    public static class Response {
        private Integer id;
        private String name;
        private String price;
        @JsonProperty("delivery_time")
        private Integer deliveryTime;
        private String error;
    }
}