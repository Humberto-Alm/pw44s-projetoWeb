package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("addresses")
public class AddressController extends CrudController<Address, AddressDTO, Long> {
    private static IAddressService addressService;
    private static ModelMapper modelMapper;

    public AddressController(IAddressService addressService, ModelMapper modelMapper) {
        super(Address.class, AddressDTO.class);
        AddressController.addressService = addressService;
        AddressController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return AddressController.addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return AddressController.modelMapper;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddressDTO>> getAddressByUser(@PathVariable Long userId) {
        List<Address> addresses = addressService.findAllByUserId(userId);
        List<AddressDTO> addressDTO = addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(addressDTO);
    }
}
