package com.les.apiv2.entities;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data@Entity
@Table(name="users")
public class Usuario implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date dtNasc;
	private String genero;
	private String cpf;
	private String tipoTel;
	private String tel;
	private String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private Boolean admin = false;
	private Boolean ativo = true;
	
	 @ManyToMany(fetch = FetchType.EAGER)
	 @JoinTable(name = "user_roles",
	 joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
	 inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	  private List<Role> roles;
	 
	 @JsonManagedReference
	 @OneToMany(cascade=CascadeType.ALL, mappedBy="usuario", fetch = FetchType.LAZY)
	 private List <Endereco> enderecos;
	 
	 @JsonManagedReference
	 @OneToMany(cascade=CascadeType.ALL,mappedBy="usuario", fetch = FetchType.LAZY)
	 private List<Cartao> cartoes;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
