package com.les.apiv2.entities.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.les.apiv2.entities.Cartao;
import com.les.apiv2.entities.Endereco;
import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.OrderStatus;
import com.les.apiv2.entities.Pedido;
import com.les.apiv2.entities.Usuario;

import lombok.Data;

@Data
public class PedidoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date dataPedido;
	private OrderStatus status;
	private Endereco endereco;
	private Usuario usuario;
	private Cartao cartao;
	private Double taxPrice;
	private Double totalPrice;
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	public PedidoDTO() {
		
	}
	
	public PedidoDTO (Pedido pedido) {
		id = pedido.getId();
		dataPedido = pedido.getDataPedido();
		endereco = pedido.getEndereco();
		taxPrice = pedido.getTaxPrice();
		totalPrice = pedido.getTotalPrice();
		cartao = pedido.getCartao();
		usuario = pedido.getUsuario();
		status = pedido.getStatus();
		orderDetails = pedido.getOrderDetails();
	}
}
