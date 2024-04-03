package com.cbs.cbsclass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.cbs.cbsclass.*")
@SpringBootApplication
public class CbsclassApplication {

	public static void main(String[] args) {
		SpringApplication.run(CbsclassApplication.class, args);
	}

}
