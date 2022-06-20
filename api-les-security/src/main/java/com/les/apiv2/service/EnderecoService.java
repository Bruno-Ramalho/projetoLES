package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.les.apiv2.entities.Endereco;
import com.les.apiv2.repository.EnderecoRepository;

@Service
public class EnderecoService {
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	
	public List<Endereco> findAll(){
		List<Endereco> list = enderecoRepository.findAll();
		return list;
	}
	
	public Endereco save (Endereco endereco) {
		return enderecoRepository.save(endereco);
		
	}
	
	public List<Endereco> findAllByIdUsuario(Integer Id_usuario){
		return enderecoRepository.findAllByIdUsuario(Id_usuario);
	}
	
	
	public Endereco findByApelido(String apelido) {
		return enderecoRepository.findByApelido(apelido);
	}
	
	public Endereco findById(Integer id) {
		Optional<Endereco> end = enderecoRepository.findById(id);
		return end.get();
	}
	
	public Endereco update(Integer id, Endereco endereco) {
		Endereco end = findById(id);
			end.setApelido(endereco.getApelido());
			end.setAddress(endereco.getAddress());
			end.setBairro(endereco.getBairro());
			end.setCity(endereco.getCity());
			end.setNumero(endereco.getNumero());
			end.setPostalCode(endereco.getPostalCode());
			end.setState(endereco.getState());
		return enderecoRepository.save(end);
	}
	
	public void deletar(Integer id) {
		enderecoRepository.deleteById(id);
	}
}