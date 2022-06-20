package com.les.apiv2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.Cupom;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Integer> {
	
	@Query("SELECT c FROM Cupom c JOIN Usuario u on c.usuario.id = u.id where c.usuario.id = ?1 ")
	public List<Cupom> findbyUserId(Integer userId);
	
}