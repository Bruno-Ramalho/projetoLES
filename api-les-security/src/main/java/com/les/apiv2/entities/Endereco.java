package com.les.apiv2.entities;

import java.io.Serializable;

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
@Table(name="address")
@Data
public class Endereco implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String apelido;
	
	@ManyToOne
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	private String address;
	private String city; 
	private String postalCode;
	private String state;
	private String numero;
	private String bairro;
	
	@JsonBackReference
	public Usuario getUsuario() {
		return usuario;
	}
}
