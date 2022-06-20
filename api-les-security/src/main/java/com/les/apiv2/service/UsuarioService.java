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
	
	public Usuario save (Usuario usuario) {
		usuario.setPassword(encoder.encode(usuario.getPassword()));
		return usuarioRepository.save(usuario);
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
		Usuario usu = findOne(id);
			usu.setPassword(encoder.encode(usuario.getPassword()));
		return usuarioRepository.save(usu);	
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

}
