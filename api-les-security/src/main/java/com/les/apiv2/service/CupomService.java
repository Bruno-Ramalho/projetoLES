package com.les.apiv2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.les.apiv2.entities.Cupom;
import com.les.apiv2.repository.CupomRepository;

@Service
public class CupomService {
	
	@Autowired
	private CupomRepository cupomRep;
	
	public List<Cupom> findAllByIdUser(Integer idUser){
		return cupomRep.findbyUserId(idUser);
	}
	
	public List<Cupom> findAll(){
		return cupomRep.findAll();
	}
	
	public Cupom findOne(Integer idCupom) {
		Optional<Cupom> cupom = cupomRep.findById(idCupom);
		return cupom.get();
	}
	
	public Cupom salvar(Cupom cupom) {
		return cupomRep.save(cupom);
	}
	
	public Cupom setFalse(Integer id) {
		Cupom cupom = cupomRep.getById(id);
		cupom.setAtivo(false);
		cupom = cupomRep.save(cupom);
		return cupom;
	}

}