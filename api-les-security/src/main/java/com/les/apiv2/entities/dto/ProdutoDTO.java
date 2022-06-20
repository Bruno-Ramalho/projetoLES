package com.les.apiv2.entities.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.Produto;
import lombok.Data;

@Data
public class ProdutoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
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
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	public ProdutoDTO(Produto p) {
		this.id = p.getId();
		this.name = p.getName();
		this.category =p.getCategory();
		this.image = p.getImage();
		this.brand = p.getBrand();
		this.description = p.getDescription();
		this.price = p.getPrice();
		this.countInStock = p.getCountInStock();
		this.rating = p.getRating();
		this.numReviews = p.getNumReviews();
		}
	
	public ProdutoDTO() {
		
	}
}
