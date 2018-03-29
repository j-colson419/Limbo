package com.revature.limbo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SpaController {

//	@RequestMapping("/profile/{username}")
//	public String profileGet(@PathVariable("username") String username) {
//		System.out.println("Zain is a cockbag. Also this username:"+username);
//		return "forward: index.html";
//	}
	
	@RequestMapping({"/", "/feed", "/login", "/auth", "/verify"})
	public String getSPA() {
		System.out.println("thing 1");
		return "forward:/index.html";
	}
	
	@RequestMapping("/profile/{username}")
	public String getSPA2() {
		
		System.out.println("thing 2");
		return "forward:/index.html";
	}
	

}