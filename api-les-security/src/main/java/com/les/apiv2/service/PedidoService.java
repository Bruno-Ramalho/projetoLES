package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.OrderStatus;
import com.les.apiv2.entities.Pedido;
import com.les.apiv2.entities.dto.PedidoDTO;
import com.les.apiv2.entities.dto.PedidoRetornoDTO;
import com.les.apiv2.repository.OrderDetailRepository;
import com.les.apiv2.repository.PedidoRepository;

@Service
public class PedidoService {
	
	@Autowired
	private PedidoRepository pedidoRep;
	
	@Autowired
	private OrderDetailRepository orderRepository;
	
		
	
	@Transactional
	public PedidoDTO insert(PedidoDTO dto) {
	Pedido pedido = new Pedido(null, OrderStatus.PENDENTE, dto.getEndereco(), dto.getUsuario(), dto.getCartao(), dto.getTotalPrice(),dto.getTaxPrice(), dto.getOrderDetails());
		
	for(OrderDetail od : dto.getOrderDetails()) {
		Optional<OrderDetail> orderDetail = orderRepository.findById(od.getId());
		pedido.getOrderDetails().add(orderDetail.get());
	}
	
	pedido = pedidoRep.save(pedido);
	return new PedidoDTO(pedido);
	}
	
	public PedidoRetornoDTO findOne (Integer id) {
		Optional<Pedido> pedido = pedidoRep.findById(id);
		PedidoRetornoDTO dto = new PedidoRetornoDTO(pedido.get());		
		return dto;
	}
	
	public List<Pedido> FindByUserId(Integer Id_usuario){
		return pedidoRep.findByIdUsuario(Id_usuario);
	}

	public Pedido setAprovado(Integer id) {
		Pedido pedido = pedidoRep.getById(id);
		pedido.setStatus(OrderStatus.APROVADO);
		pedido = pedidoRep.save(pedido);
		return pedido;
	}
	
	public Pedido setEnviado(Integer id) {
		Pedido pedido = pedidoRep.getById(id);
		pedido.setStatus(OrderStatus.ENVIADO);
		pedido = pedidoRep.save(pedido);
		return pedido;
	}
	
	public Pedido setEntregue(Integer id) {
		Pedido pedido = pedidoRep.getById(id);
		pedido.setStatus(OrderStatus.ENTREGUE);
		pedido = pedidoRep.save(pedido);
		return pedido;
	}
	
	public Pedido setDevolucaoPendente(Integer id) {
		Pedido pedido = pedidoRep.getById(id);
		pedido.setStatus(OrderStatus.DEVOLUCAO_PENDENTE);
		pedido = pedidoRep.save(pedido);
		return pedido;
	}
	
	public Pedido setDevolvido(Integer id) {
		Pedido pedido = pedidoRep.getById(id);
		pedido.setStatus(OrderStatus.DEVOLVIDO);
		pedido = pedidoRep.save(pedido);
		return pedido;
	}

	public List<Pedido> findAll() {
		return pedidoRep.findAll();
		 
	}
	
	
}
