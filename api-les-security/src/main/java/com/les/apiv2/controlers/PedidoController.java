package com.les.apiv2.controlers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.les.apiv2.entities.Pedido;
import com.les.apiv2.entities.dto.PedidoDTO;
import com.les.apiv2.entities.dto.PedidoRetornoDTO;
import com.les.apiv2.service.PedidoService;

@RestController
@RequestMapping(value = "/api/orders")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	
	@PostMapping
	public ResponseEntity<PedidoDTO> insert (@RequestBody PedidoDTO dto){
		dto = pedidoService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<Pedido>> listar(){
		 List<Pedido> pedidos = pedidoService.findAll();
		 return ResponseEntity.ok(pedidos);
	}
	
	@GetMapping(value = "/pedido/{id}")
	public ResponseEntity<PedidoRetornoDTO> findOneById (@PathVariable ("id") Integer id){
		PedidoRetornoDTO pedido = pedidoService.findOne(id);
		return ResponseEntity.ok(pedido);
	}
	
	@GetMapping(value = "/{idUsuario}")
	public ResponseEntity<List<Pedido>> findByIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
		List<Pedido> list = pedidoService.FindByUserId(idUsuario);
		return ResponseEntity.ok(list);
	}
	
	@PatchMapping("/{id}/aprovado")
	public ResponseEntity<Pedido> setAprovado(@PathVariable("id") Integer id){
		Pedido pedido = pedidoService.setAprovado(id);
		return ResponseEntity.ok().body(pedido);
	}
	
	@PatchMapping("/{id}/enviado")
	public ResponseEntity<Pedido> setEnviado(@PathVariable("id") Integer id){
		Pedido pedido = pedidoService.setEnviado(id);
		return ResponseEntity.ok().body(pedido);
	}
	
	@PatchMapping("/{id}/entregue")
	public ResponseEntity<Pedido> setEntregue(@PathVariable("id") Integer id){
		Pedido pedido = pedidoService.setEntregue(id);
		return ResponseEntity.ok().body(pedido);
	}
	
	@PatchMapping("/{id}/devolucaopendente")
	public ResponseEntity<Pedido> setDevolucaoPendente(@PathVariable("id") Integer id){
		Pedido pedido = pedidoService.setDevolucaoPendente(id);
		return ResponseEntity.ok().body(pedido);
	}
	
	@PatchMapping("/{id}/devolvido")
	public ResponseEntity<Pedido> setDevolvido(@PathVariable("id") Integer id){
		Pedido pedido = pedidoService.setDevolvido(id);
		return ResponseEntity.ok().body(pedido);
	}
}
