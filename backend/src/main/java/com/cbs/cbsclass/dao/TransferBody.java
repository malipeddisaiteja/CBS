package com.cbs.cbsclass.dao;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferBody {
    long sender_accountno;

    long receiver_accountno;

    float amount;
}
