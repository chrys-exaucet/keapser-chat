package com.keasperchat.authentification.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.keasperchat.authentification.dto.UserDTO;
import com.keasperchat.authentification.mapper.UserMapper;
import com.keasperchat.authentification.service.UserService;


import io.swagger.annotations.ApiOperation;

import static java.util.stream.Collectors.toList;

import java.net.URI;

@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	public final UserMapper mapper =  UserMapper.INSTANCE;

	@ApiOperation(value="Retourne tous les utilisateurs")
	@GetMapping(value = "/users")
	private List<UserDTO> getUsers(){
		return userService.findAll().stream().map(mapper::toDto).collect(toList());
	}

	@ApiOperation(value="Retourne un utilisateur par son id")
	@GetMapping(value="/user/{id}")
	private UserDTO getUserById(@PathVariable long id) {
		return mapper.toDto(userService.findById(id));
	}

	@ApiOperation(value="Enregistre un nouvel utlisateur")
	@PostMapping(value="/add")
	private ResponseEntity<UserDTO> newUser(@Valid @RequestBody UserDTO newUser) {
		UserDTO user = mapper.toDto(userService.save(mapper.fromDto(newUser)));
		if(user==null) return ResponseEntity.noContent().build();
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/")
				.buildAndExpand(newUser)
				.toUri();
		return ResponseEntity.created(location).build();
	}


	@ApiOperation(value="Met à jour un utilisateur")
	@PutMapping(path = "/update")
	public ResponseEntity<UserDTO> updateEmployee(@Valid @RequestBody UserDTO userUpdate) {
		if((userService.update(mapper.fromDto(userUpdate))!=null)) {
			return ResponseEntity.status(HttpStatus.RESET_CONTENT).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build() ;
	}

	@ApiOperation(value="Supprime un utlisateur")
	@DeleteMapping(path = "/delete")
	public ResponseEntity<UserDTO> deleteEmployee(@Valid @RequestBody UserDTO dto) {
		if (userService.delete(mapper.fromDto(dto)))
		return ResponseEntity.ok().build();
		else return ResponseEntity.notFound().build();
	}
}
