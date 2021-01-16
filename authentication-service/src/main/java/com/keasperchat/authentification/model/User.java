package com.keasperchat.authentification.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonIgnore
	private long id;
	
	private String firstname;
	
	private String lastname;
	
	@Email
	@Column(unique = true)
	private String email;
	
	
	private String country;
	
	@Column(unique = true)
	private int tel;
	
	private LocalDate birthday;
	
	@JsonIgnore
	private LocalDateTime createdAccount;
	
	private String hashPass;
	

	@PrePersist
	private void onCreate() {
		this.setCreatedAccount(LocalDateTime.now());
	}


	public User(long id, String firstname, String lastname, @Email String email, String country, int tel) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.country = country;
		this.tel = tel;
	}



	
	
}
