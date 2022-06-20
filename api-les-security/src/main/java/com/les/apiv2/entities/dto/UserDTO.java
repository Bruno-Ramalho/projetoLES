package com.les.apiv2.entities.dto;

import org.modelmapper.ModelMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.les.apiv2.entities.Usuario;

import lombok.Data;

@Data
public class UserDTO {
	
	private Integer id;
	private String name;
    private String email;
    private Boolean admin;
    private String token;
    

    public static UserDTO create(Usuario user, String token) {
        ModelMapper modelMapper = new ModelMapper();
        UserDTO dto = modelMapper.map(user, UserDTO.class);
        dto.token = token;
        return dto;
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper m = new ObjectMapper();
        return m.writeValueAsString(this);
    }
}
