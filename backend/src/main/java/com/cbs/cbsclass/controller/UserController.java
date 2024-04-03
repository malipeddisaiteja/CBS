package com.cbs.cbsclass.controller;


import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Customer;
import com.cbs.cbsclass.service.AccountService;
import com.cbs.cbsclass.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/register")
    public String add(@RequestBody Customer c){
        service.register(c);
        return new Gson().toJson("Registered Successfully "+c.getCustid());
    }

    @PostMapping("/login")
    public String login(@RequestBody Customer c){
        boolean b= service.authenticate(c);
        if(b){
            return new Gson().toJson(true);
        }
        return new Gson().toJson(false);
    }

    @DeleteMapping("/delete")
    public String delete(@RequestParam String cid){
         return new Gson().toJson(service.delete(cid));
    }
}

