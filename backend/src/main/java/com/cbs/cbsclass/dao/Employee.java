package com.cbs.cbsclass.dao;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@Entity(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private int empid;

    @Column
    private String password;

    @Column
    private String firstname;

    @Column
    private String middlename;


    @Column
    private String lastname;


    @Column
    private String mobileno;

    @Column
    private String emailid;

    @Column
    private Date dob;

    @Column
    private boolean isactive;

    @Column
    private LocalDateTime createdat;

    @Column
    private LocalDateTime updatedat;

    @Column
    private String createdby = "System";

    @Column
    private String updatedby;




}
