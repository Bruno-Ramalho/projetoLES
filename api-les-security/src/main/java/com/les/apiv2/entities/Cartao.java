package com.les.apiv2.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Table(name="cards")
@Data
public class Cartao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Long number;
	private String cardHolderName;
	private Integer cvc;
	private String bandeira;
	private String dueData;
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario; 
	
	@JsonBackReference
	public Usuario getUsuario() {
		return usuario;
	}
}