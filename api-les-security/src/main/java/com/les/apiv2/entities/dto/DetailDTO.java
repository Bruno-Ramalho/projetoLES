package com.les.apiv2.entities.dto;

import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.Produto;

import lombok.Data;

@Data
public class DetailDTO {
	
	private Integer id;
	private Long quantity;
	private Produto produto;
	
	public DetailDTO (OrderDetail entity) {
		this.id = entity.getId();
		this.quantity = entity.getQuantity();
		this.produto = entity.getProduto();
	}
}
