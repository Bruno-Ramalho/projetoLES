package com.les.apiv2.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Data
public class Cupom implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Double valorCupom;
	
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	private Boolean ativo = true;
	
	@JsonBackReference
	public Usuario getUsuario() {
		return usuario;
	}
	
}