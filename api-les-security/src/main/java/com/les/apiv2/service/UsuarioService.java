package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.les.apiv2.entities.Usuario;
import com.les.apiv2.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Usuario> findAll(){
		List<Usuario> list = usuarioRepository.findAll();
		return list;
	}
	
	public Usuario save(Usuario usuario) throws IllegalArgumentException {
		if(senhaForte(usuario.getPassword())) {
		usuario.setPassword(encoder.encode(usuario.getPassword()));
		return usuarioRepository.save(usuario);
		}else {
			throw new IllegalArgumentException ("A senha deve conter: Mais do que 8 caracteres;"
					+ "Letras maiúsculas e minúsculas;"
					+ "Números;"
					+ "Caracteres especiais.");
		}
	}

	public Usuario findOne(Integer id) {
		Optional<Usuario> usu =  usuarioRepository.findById(id);
		return usu.get();
	}
	
	public Usuario update(Usuario usuario, Integer id) {
		Usuario usu = findOne(id);
			usu.setName(usuario.getName());
			usu.setDtNasc(usuario.getDtNasc());
			usu.setGenero(usuario.getGenero());
			usu.setCpf(usuario.getCpf());
			usu.setTipoTel(usuario.getTipoTel());
			usu.setTel(usuario.getTel());
			usu.setEmail(usuario.getEmail());
		return usuarioRepository.save(usu);
	}
	
	public Usuario changePassword(Usuario usuario, Integer id) {
		
		if(senhaForte(usuario.getPassword())) {
			Usuario usu = findOne(id);
			usuario.setPassword(encoder.encode(usuario.getPassword()));
			return usuarioRepository.save(usu);
			}else {
				throw new IllegalArgumentException ("A senha deve conter: Mais do que 6 caracteres;"
						+ "Letras maiúsculas e minúsculas;"
						+ "Números;"
						+ "Caracteres especiais.");
			}
	}
	
	public Usuario inativar (Integer id) {
		Usuario usu = usuarioRepository.getById(id);
		usu.setAtivo(false);
		return usuarioRepository.save(usu);
	}
	
	public Usuario ativar(Integer id) {
		Usuario usu = usuarioRepository.getById(id);
		usu.setAtivo(true);
		return usuarioRepository.save(usu);
	}
	
	public static boolean senhaForte(String senha) {
	    if (senha.length() < 8) return false;

	    boolean achouNumero = false;
	    boolean achouMaiuscula = false;
	    boolean achouMinuscula = false;
	    boolean achouSimbolo = false;
	    for (char c : senha.toCharArray()) {
	         if (c >= '0' && c <= '9') {
	             achouNumero = true;
	         } else if (c >= 'A' && c <= 'Z') {
	             achouMaiuscula = true;
	         } else if (c >= 'a' && c <= 'z') {
	             achouMinuscula = true;
	         } else {
	             achouSimbolo = true;
	         }
	    }
	    return achouNumero && achouMaiuscula && achouMinuscula && achouSimbolo;
	}
}
