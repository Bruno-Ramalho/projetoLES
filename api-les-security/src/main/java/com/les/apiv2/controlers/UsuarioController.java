package com.les.apiv2.controlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.les.apiv2.entities.Usuario;
import com.les.apiv2.service.UsuarioService;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity<List<Usuario>> findAll(){
		List<Usuario> list = usuarioService.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping(value = "/register")
	public ResponseEntity<Usuario> save(@RequestBody Usuario usuario){
	 return new ResponseEntity<Usuario>(this.usuarioService.save(usuario),HttpStatus.CREATED);
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity<Usuario> encontraUm(@PathVariable ("id") Integer id){
		return new ResponseEntity<Usuario>(this.usuarioService.findOne(id), HttpStatus.OK);
	}
	
	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Usuario> editar(@PathVariable(name = "id", required = true) Integer id, @RequestBody Usuario usu){
		Usuario usuario = usuarioService.update(usu, id);
		return usuario == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(usuario);
	}
	
	@PatchMapping(value = "/{id}/newpassword")
	public ResponseEntity<Usuario> changePassword(@PathVariable(name = "id", required = true) Integer id, @RequestBody Usuario usu){
		Usuario usuario = usuarioService.changePassword(usu, id);
		return usuario == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(usuario);
	}

	@PatchMapping(value ="/{id}/inativar")
	public ResponseEntity<Usuario> setInativo(@PathVariable("id") Integer id){
		Usuario usu = usuarioService.inativar(id);
		return ResponseEntity.ok().body(usu);
	}
	
	@PatchMapping(value ="/{id}/ativar")
	public ResponseEntity<Usuario> setAtivo(@PathVariable("id") Integer id){
		Usuario usu = usuarioService.ativar(id);
		return ResponseEntity.ok().body(usu);
	}
}
