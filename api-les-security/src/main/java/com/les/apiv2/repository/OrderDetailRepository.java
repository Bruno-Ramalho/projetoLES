package com.les.apiv2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.les.apiv2.entities.OrderDetail;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	
	@Query(value="SELECT pe.data_pedido, sum(od.quantity), pr.category FROM pedidos pe JOIN order_details od ON pe.id=od.pedido_id JOIN products pr ON od.produto_id=pr.id group by pe.data_pedido;", nativeQuery = true)
	public List<OrderDetail> findAllOrdersGraph();
	
	@Query(value = "Select dp from OrderDetail dp where dp.pedido.id = ?1")
	public List<OrderDetail> findByPedido(Integer idPedido);
	
}