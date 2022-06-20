package com.les.apiv2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.Endereco;

@Repository
public interface EnderecoRepository  extends JpaRepository<Endereco, Integer>{
	
	@Query(value="Select e from Endereco e join Usuario u on e.usuario.id = u.id where e.usuario.id = ?1") 
	public List<Endereco> findAllByIdUsuario(Integer id_usuario);
	
	public Endereco findByApelido(String apelido);
	
}
