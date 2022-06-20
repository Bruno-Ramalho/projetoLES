package com.les.apiv2.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="products")
@Data
public class Produto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String name;
	private String category;
	private String image;
	private String brand;
	private String description;
	private Double price;
	private Integer countInStock;
	private Float rating;
	private Integer numReviews;
	

	@OneToMany(cascade = CascadeType.ALL)
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	public Produto(Integer id, String name, String category, String image, String brand, String description,
			Double price, Integer countInStock, Float rating, Integer numReviews, List<OrderDetail> orderDetails) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.image = image;
		this.brand = brand;
		this.description = description;
		this.price = price;
		this.countInStock = countInStock;
		this.rating = rating;
		this.numReviews = numReviews;
		this.orderDetails = orderDetails.stream().map(pd -> new OrderDetail(pd)).collect(Collectors.toList());
	}
	
	public Produto() {
		
	}
	
}