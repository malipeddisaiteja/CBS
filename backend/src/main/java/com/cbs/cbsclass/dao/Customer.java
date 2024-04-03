package com.cbs.cbsclass.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Entity(name = "customer")

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter  private int id;


    @Column(unique = true)
    @Getter @Setter private String custid;


    @Column
    @Getter @Setter private String password;


    @Column
    @Getter @Setter private String firstname;

    @Column
    @Getter @Setter private String middlename;


    @Column
    @Getter @Setter private String lastname;


    @Column
    @Getter @Setter private String mobileno;

    @Column
    @Getter @Setter private String emailid;

    @Column
    @Getter @Setter private Date dob;

    @Column
    @Getter @Setter private String address;


    @Column
    @Getter @Setter private String country;

    @Column
    @Getter @Setter private String state;

    @Column
    @Getter @Setter private String city;

    @Column
    @Getter @Setter private int pin;

    @Column
    @Getter @Setter private String fathername;

    @Column
    @Getter @Setter private String mothername;

    @Column
    @Getter @Setter private String pan;

    @Column
    @Getter @Setter private String aadharid;

    @Column
    @Getter @Setter private boolean isactive;

    @Column
    @Getter @Setter private LocalDateTime createdat;

    @Column
    @Getter @Setter private LocalDateTime updatedat;

    @Column
    @Getter @Setter private String createdby;

    @Column
    @Getter @Setter private String updatedby;

}
