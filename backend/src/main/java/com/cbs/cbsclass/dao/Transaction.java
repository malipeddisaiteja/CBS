package com.cbs.cbsclass.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@Entity(name = "transaction")
@Getter @Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String tx_ref_no;

    @Column
    private long accountno;

    @Column
    private String type;

    @Column
    private float amount;

    @Column
    private float balance;

    @Column
    private LocalDateTime tx_at;
    
    @Column
    private long tx_from;

    @Column
    private long tx_to;

    @Column
    private String tx_mode;

    @Column
    private String tx_status;

    @Column
    private Float interestamount;

    }
