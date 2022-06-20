package com.les.apiv2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
	
	@Query("SELECT p FROM Pedido p join Usuario u on p.usuario.id = u.id where p.usuario.id = ?1")
	List<Pedido> findByIdUsuario(Integer idUsuario);
	
}

