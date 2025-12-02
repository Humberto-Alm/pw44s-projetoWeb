package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.model.User; // Importar
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import jakarta.validation.Valid; // Importar
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus; // Importar
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("addresses")
public class AddressController extends CrudController<Address, AddressDTO, Long> {
    private final IAddressService addressService;
    private final ModelMapper modelMapper;
    private final AuthService authService;

    public AddressController(IAddressService addressService, ModelMapper modelMapper, AuthService authService) {
        super(Address.class, AddressDTO.class);
        this.addressService = addressService;
        this.modelMapper = modelMapper;
        this.authService = authService;
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @Override
    @PostMapping
    public ResponseEntity<AddressDTO> create(@RequestBody @Valid AddressDTO dto) {
        // 1. Pega o usuário logado
        User authenticatedUser = authService.getAuthenticatedUser();

        // 2. Converte DTO para Entidade
        Address address = modelMapper.map(dto, Address.class);

        // 3. Força o vínculo com o usuário
        address.setUser(authenticatedUser);

        // 4. Salva
        Address saved = addressService.save(address);

        // 5. Retorna
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(saved, AddressDTO.class));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddressDTO>> getAddressByUser(@PathVariable Long userId) {
        List<Address> addresses = addressService.findAllByUserId(userId);
        List<AddressDTO> addressDTO = addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(addressDTO);
    }

    @GetMapping("/my_address")
    public ResponseEntity<List<AddressDTO>> getMyAddress() {
        Long userId = authService.getAuthenticatedUserId();
        List<Address> addresses = addressService.findAllByUserId(userId);
        List<AddressDTO> addressDTOs = addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(addressDTOs);
    }
}