package com.les.apiv2.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "order_details")
public class OrderDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name ="produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "pedido_id")
	private Pedido pedido;
	
	private Long quantity;
	
	public OrderDetail(OrderDetail pd) {
		this.id = pd.id;
		this.produto = pd.produto;
		this.quantity = pd.quantity;
		this.produto = pd.produto;
	}
	
	public OrderDetail() {
		
	}

	public OrderDetail(Integer id, Produto produto, Pedido pedido, Long quantity) {
		this.id = id;
		this.produto = produto;
		this.quantity = quantity;
		this.pedido = pedido;
	}
	
}