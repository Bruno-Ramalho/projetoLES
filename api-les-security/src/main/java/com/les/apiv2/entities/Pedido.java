package com.les.apiv2.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;



@Data
@Entity
@Table(name = "pedidos")
public class Pedido implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date dataPedido = new Date();
	private OrderStatus status = OrderStatus.PENDENTE;
	@OneToOne
	private Endereco endereco;
	@OneToOne
	private Usuario usuario;
	@OneToOne
	private Cartao cartao;
	

	@OneToMany(cascade = CascadeType.ALL)
//	@JoinTable(name = "orderdetail_order", joinColumns = {
//			@JoinColumn(name = "order_id", referencedColumnName = "id")}, inverseJoinColumns = {
//					@JoinColumn(name = "orderdetail_id", referencedColumnName = "id") })
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	/*
	@ManyToMany
	@JoinTable(name = "order_product", joinColumns = {
			@JoinColumn(name = "order_id", referencedColumnName = "id")}, inverseJoinColumns = {
					@JoinColumn(name = "product_id", referencedColumnName = "id") })
	private List<Produto> produtos = new ArrayList<>();
	*/
	private Double taxPrice;
	private Double totalPrice;

	

	public Pedido(Integer id, OrderStatus status, Endereco endereco, Usuario usuario, Cartao cartao,
			Double taxPrice, Double totalPrice, List<OrderDetail> orderDetails) {
	
		this.id = id;
		this.status = status;
		this.endereco = endereco;
		this.usuario = usuario;
		this.cartao = cartao;
		this.taxPrice = taxPrice;
		this.totalPrice = totalPrice;
		this.orderDetails = orderDetails.stream().map(pd -> new OrderDetail(pd)).collect(Collectors.toList());

	}
	
	public Pedido() {
		
	}

}
