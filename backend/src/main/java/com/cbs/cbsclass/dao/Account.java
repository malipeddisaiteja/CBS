package com.cbs.cbsclass.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;



    @Column
    private long accountno;



    @Column
    private String custid;

    @Column
    private String ifsccode;

    @Column
    private String branch;

    @Column
    private String type;

    @Column
    private float balance;



    @Column
    private boolean isActive;

    @Column
    @Getter @Setter private String nominee1;

    @Column
    @Getter @Setter private String nominee2;

    @Column
    @Getter @Setter private String upiid;

    @Column
    @Getter @Setter private String category;

//    @Column
//    @Getter @Setter private long debitcardno;
//
//    @Column
//    @Getter @Setter private long creditcardno;

    @Column
    @Getter @Setter private boolean enablednetbanking;

    @Column
    @Getter @Setter private LocalDateTime last_tx_date;

    @Column
    @Getter @Setter private LocalDateTime createdat;

    @Column
    @Getter @Setter private LocalDateTime closedat;

    @Column
    @Getter @Setter private String createdby;

    @Column
    @Getter @Setter private String closedby;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getAccountno() {
        return accountno;
    }

    public void setAccountno(long accountno) {
        this.accountno = accountno;
    }

    public String getCustid() {
        return custid;
    }

    public void setCustid(String custid) {
        this.custid = custid;
    }

    public String getIfsccode() {
        return ifsccode;
    }

    public void setIfsccode(String ifsccode) {
        this.ifsccode = ifsccode;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getAccounttype() {
        return type;
    }

    public void setAccounttype(String accounttype) {
        this.type = accounttype;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }
}
