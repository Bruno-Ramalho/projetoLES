package com.les.apiv2.controlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.les.apiv2.entities.Endereco;
import com.les.apiv2.service.EnderecoService;

@CrossOrigin
@RestController
@RequestMapping("/api/address")
public class EnderecoController {
	
	@Autowired
	private EnderecoService enderecoService;
	
	@GetMapping
	public ResponseEntity<List<Endereco>> findAll(){
		List<Endereco> list = enderecoService.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping(value = "/cadastrar")
	public ResponseEntity<Endereco> save(@RequestBody Endereco endereco){
		return new ResponseEntity<Endereco>(this.enderecoService.save(endereco),HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/{idUsuario}")
	public ResponseEntity<List<Endereco>> findAllByIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
		List<Endereco> list = enderecoService.findAllByIdUsuario(idUsuario);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/apelido/{apelido}")
	public ResponseEntity<Endereco> findByApelido (@PathVariable ("apelido") String apelido){
		return new ResponseEntity<Endereco>(this.enderecoService.findByApelido(apelido),HttpStatus.OK);
	}
	
	@GetMapping(value = "/endereco/{id}")
	public ResponseEntity<Endereco> findOneById(@PathVariable ("id") Integer id){
		return new ResponseEntity<Endereco>(this.enderecoService.findById(id),HttpStatus.OK);
	}
	
	@PutMapping(value = "/update/{id}")
	public ResponseEntity<Endereco> editar(@PathVariable ("id") Integer id, @RequestBody Endereco endereco){
		endereco.setId(id);
		Endereco end = enderecoService.update(id, endereco);
		return end == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(end);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<Void> deleta(@PathVariable ("id") Integer id){
		enderecoService.deletar(id);
		return ResponseEntity.noContent().build();
	}
}