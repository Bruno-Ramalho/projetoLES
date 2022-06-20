package com.les.apiv2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.OrderDetail;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	
//	@Query(value="select pr.category, pe.data_pedido, dp.quantity FROM order_details as dp JOIN products as pr on dp.produto_id = pr.id JOIN pedidos as pe on dp.pedido_id = pe.id", nativeQuery = true)
//	public List<OrderDetail> findAllOrdersGraph();
	
	@Query(value = "Select dp from OrderDetail dp where dp.pedido.id = ?1")
	public List<OrderDetail> findByPedido(Integer idPedido);
	
}