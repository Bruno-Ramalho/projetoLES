package com.les.apiv2.entities.dto;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.les.apiv2.entities.Endereco;
import com.les.apiv2.entities.OrderStatus;
import com.les.apiv2.entities.Pedido;

import lombok.Data;

@Data
public class PedidoRetornoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date dataPedido;
	private OrderStatus status;
	private Endereco endereco;
	private Double taxPrice;
	private Double totalPrice;
	
	public PedidoRetornoDTO (Pedido pedido) {
		id = pedido.getId();
		dataPedido = pedido.getDataPedido();
		endereco = pedido.getEndereco();
		taxPrice = pedido.getTaxPrice();
		totalPrice = pedido.getTotalPrice();		
		status = pedido.getStatus();
	}

}
