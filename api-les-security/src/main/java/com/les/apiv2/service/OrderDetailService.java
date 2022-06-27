package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.dto.DetailDTO;
import com.les.apiv2.repository.OrderDetailRepository;

@Service
public class OrderDetailService {
	
	@Autowired
	private OrderDetailRepository repository;
	
	public OrderDetail save(OrderDetail orderDetail) {
		return repository.save(orderDetail);		
	}
	
	public List<OrderDetail> list (){
		return repository.findAll();
	}
	
	public List<OrderDetail> graph (){
		return repository.findAllOrdersGraph();
	}
	
	public OrderDetail findOne(Integer id) {
		Optional<OrderDetail> od = repository.findById(id);
		return od.get();
	}

	public List<OrderDetail> findAll() {
		return repository.findAll();
	}
	
	public List<OrderDetail> findByPedido(Integer idPedido){
		return repository.findByPedido(idPedido);
	}
	
	
	public DetailDTO detalharPedidoUnico(Integer id) {
		DetailDTO dto = new DetailDTO(findOne(id));
		return dto;
	}

}