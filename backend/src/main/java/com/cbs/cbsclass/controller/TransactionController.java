package com.cbs.cbsclass.controller;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Transaction;
import com.cbs.cbsclass.dao.TransferBody;
import com.cbs.cbsclass.service.TransactionService;
import com.cbs.cbsclass.service.InterestCalculationService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import static java.lang.Integer.parseInt;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    @Autowired
    TransactionService ts;

    @Autowired
    InterestCalculationService is;

    @PostMapping("/statement")
    public List<Transaction> getHistory(@RequestBody Account acc) {
        System.out.println("in /statement :" + acc.getAccountno());
        return ts.getHistory(acc.getAccountno());
    }

    @PostMapping("/transfer")
    public String sendMoney(@RequestBody TransferBody tbody) {
        System.out.printf("sender: %s   \nreceiver: %s \n", tbody.getSender_accountno(), tbody.getReceiver_accountno());
        return new Gson().toJson(ts.sendMoney(tbody.getSender_accountno(), tbody.getReceiver_accountno(), tbody.getAmount()));
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<Transaction>> getStatement(@RequestParam String month, @RequestParam String accountno){
        int mn=Integer.parseInt(month);
        long acn=Long.parseLong(accountno);
        List<Transaction> listTransactions = ts.getStatement(mn,acn);
        System.out.println(listTransactions.toString());
        return new ResponseEntity<>(listTransactions, HttpStatus.OK);
    }

    @PostMapping("/calcinterest")
    public String calcinterest(){
        is.runInterestOnAllAccounts();
        return new Gson().toJson( "Quaterly Interest has been added Successfully");
    }
}