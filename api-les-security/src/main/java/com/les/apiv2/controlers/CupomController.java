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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.les.apiv2.entities.Cupom;
import com.les.apiv2.service.CupomService;

@CrossOrigin
@RestController
@RequestMapping("/api/cupons")
public class CupomController {
	
	@Autowired
	private CupomService cupomService;
	
	@GetMapping
	public ResponseEntity<List<Cupom>> findAll(){
		List<Cupom> list = cupomService.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping(value = "/cadastrar")
	public ResponseEntity<Cupom> save(@RequestBody Cupom cupom){
		return new ResponseEntity<Cupom>(this.cupomService.salvar(cupom),HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/{idUsuario}")
	public ResponseEntity<List<Cupom>> findAllByIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
		List<Cupom> list = cupomService.findAllByIdUser(idUsuario);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/cupom/{id}")
	public ResponseEntity<Cupom> findByNumber (@PathVariable ("id") Integer id){
		return new ResponseEntity<Cupom>(this.cupomService.findOne(id),HttpStatus.OK);
	}
	
	@PatchMapping("/{id}/inativar")
	public ResponseEntity<Cupom> setInativo(@PathVariable("id") Integer id){
		Cupom cupom = cupomService.setFalse(id);
		return ResponseEntity.ok().body(cupom);
	}

}