package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.DTO.FreightResponseDTO;
import br.edu.utfpr.pb.pw44s.server.DTO.MelhorEnvioDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Comparator;
import java.util.Arrays;

@Service
public class FreightService {

    @Value("${melhorenvio.token}")
    private String token;

    @Value("${melhorenvio.url}")
    private String url;

    @Value("${melhorenvio.cep.origem}")
    private String cepOrigem;

    public FreightResponseDTO calculateCheapestFreight(String cepDestino, Double valorSeguro) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        headers.set(HttpHeaders.USER_AGENT, "Tabula Loja (contato@tabula.com.br)");

        // 2. Tratamento do Valor do Seguro
        // Se for nulo ou menor que 20 reais, força 20.0 (mínimo aceitável por algumas transportadoras)
        double seguroFinal = (valorSeguro != null && valorSeguro >= 20.0) ? valorSeguro : 20.0;

        // 3. Montar Produto Fixo (0.5kg)
        MelhorEnvioDTO.ProductInfo product = new MelhorEnvioDTO.ProductInfo(
                "box_padrao",
                20, 20, 20, // Dimensões
                0.5,        // Peso 500g
                seguroFinal, // Valor do Carrinho
                1
        );

        MelhorEnvioDTO.From from = new MelhorEnvioDTO.From(cepOrigem);
        MelhorEnvioDTO.To to = new MelhorEnvioDTO.To(cepDestino);

        MelhorEnvioDTO.Request requestBody = new MelhorEnvioDTO.Request(
                from, to, Collections.singletonList(product)
        );

        HttpEntity<MelhorEnvioDTO.Request> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 4. Chamada API
            MelhorEnvioDTO.Response[] responseArray = restTemplate.postForObject(url, entity, MelhorEnvioDTO.Response[].class);

            if (responseArray == null || responseArray.length == 0) {
                return new FreightResponseDTO(0.0, 0);
            }

            // 5. Filtrar o Menor Preço
            MelhorEnvioDTO.Response cheapestOption = Arrays.stream(responseArray)
                    .filter(opt -> opt.getError() == null) // Sem erro
                    .filter(opt -> opt.getPrice() != null) // Com preço
                    .min(Comparator.comparingDouble(opt -> Double.parseDouble(opt.getPrice()))) // Menor valor
                    .orElseThrow(() -> new RuntimeException("Nenhuma opção de frete disponível."));

            Double finalPrice = Double.parseDouble(cheapestOption.getPrice());
            return new FreightResponseDTO(finalPrice, cheapestOption.getDeliveryTime());

        } catch (Exception e) {
            e.printStackTrace();
            // Retorna zero em caso de erro para não travar a tela do usuário
            return new FreightResponseDTO(0.0, 0);
        }
    }
}