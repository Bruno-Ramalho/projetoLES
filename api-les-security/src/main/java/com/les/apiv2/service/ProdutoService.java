package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.les.apiv2.entities.OrderDetail;
import com.les.apiv2.entities.Produto;
import com.les.apiv2.repository.OrderDetailRepository;
import com.les.apiv2.repository.ProdutoRepository;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private OrderDetailRepository orderRepository;	
	
	public List<Produto> findAll(){
		List<Produto> list = produtoRepository.findAll();
		return list;
	}
	
	public Produto save(Produto produto) {
		Produto produtoNovo = new Produto(null, produto.getName(), produto.getCategory(), produto.getImage(), produto.getBrand(), produto.getDescription(),
				produto.getPrice(), produto.getCountInStock(), produto.getRating(), produto.getNumReviews(), produto.getOrderDetails());
		for(OrderDetail od : produto.getOrderDetails()) {
			Optional<OrderDetail> orderDetail = orderRepository.findById(od.getId());
			produtoNovo.getOrderDetails().add(orderDetail.get());
		}
		return produtoRepository.save(produtoNovo);
	}
	
	public Produto findOne(Integer id) {
		Optional<Produto> prod = produtoRepository.findById(id);
		return prod.get();
	}
}