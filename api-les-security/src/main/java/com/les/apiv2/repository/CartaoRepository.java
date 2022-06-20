package com.les.apiv2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.Cartao;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Integer>{

	@Query(value="Select c from Cartao c join Usuario u on c.usuario.id = u.id where c.usuario.id = ?1")
	public List<Cartao> findAllByIdUsuario(Integer id_usuario);
	
	public Cartao findByNumber(Long number);
}
