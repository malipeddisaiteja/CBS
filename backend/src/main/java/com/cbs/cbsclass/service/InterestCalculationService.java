package com.cbs.cbsclass.service;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Transaction;
import com.cbs.cbsclass.repository.AccountRepo;
import com.cbs.cbsclass.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class InterestCalculationService {
   @Autowired
    private AccountRepo accRepo;
    @Autowired
    private TransactionsRepository transRepo;

    public void runInterestOnAllAccounts(){
        System.out.println("Received request to start Interest Calculation **********");
        List<Account> allAccounts = (List<Account>) accRepo.findAll();
        System.out.println("Found Total number of Accounts count: "+allAccounts.size());
        System.out.println("Fetching All Accounts from DataBase ********");
        for(Account acc: allAccounts){
            System.out.println("Started Interest calculation for accno: "+acc.getAccountno());
            if(acc.isActive()) calcInterest(acc);
        }
        System.out.println("Interest Calculation Process is Completed! *********");
    }

    public void calcInterest(Account acc) {
        float principle_sum = 0;
        LocalDateTime currentDate = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        LocalDateTime quarterStartDate = currentDate.minusMonths(3);
        List<Transaction> txRecords = transRepo.findIfInterestCredited(acc.getAccountno(),quarterStartDate,currentDate);
        System.out.println("Found tx record count: "+txRecords.size());
        System.out.println((!acc.isActive())  || (txRecords != null & !txRecords.isEmpty()));
        if((!acc.isActive())  || (txRecords != null & !txRecords.isEmpty())) return;
        System.out.println("Started Interest calculation for accno: "+acc.getAccountno());
        float latestBalance = 0;
        System.out.println("date equals: "+quarterStartDate.plusDays(90).equals(currentDate));
        while(!quarterStartDate.equals(currentDate)){
            System.out.println("quarterStartDate: "+ quarterStartDate);
            List<Transaction> allTransactions = transRepo.findByDate(quarterStartDate,acc.getAccountno());
            if(!allTransactions.isEmpty()){
                for(Transaction tx: allTransactions){
                    latestBalance = tx.getBalance();
                    if(tx != null && tx.getBalance()>300){
                        principle_sum += tx.getBalance();
                    }
                }
            }
            quarterStartDate = quarterStartDate.plusDays(1);
        }
        if(principle_sum==0){
            if(acc.getBalance()>300){
                principle_sum += acc.getBalance();
            }
        }
        float interestAmount = (principle_sum * 2) / (4*100);
        System.out.println("Interest Caluculated for accountno: "+acc.getAccountno());

        // Transaction table record entry
        Transaction transaction = new Transaction();
        transaction.setInterestamount(interestAmount);
        transaction.setTx_ref_no("TX"+acc.getAccountno()+LocalDate.now());
        transaction.setAccountno(acc.getAccountno());
        transaction.setType("QI");
        transaction.setAmount(interestAmount);
        transaction.setBalance(acc.getBalance()+interestAmount);
        transaction.setTx_at(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
        transaction.setTx_from(0L);
        transaction.setTx_to(acc.getAccountno());
        transaction.setTx_mode("System Gen");
        transaction.setTx_status("Success");
        transRepo.save(transaction);

        // Account table record updation
        acc.setBalance(acc.getBalance()+interestAmount);
        acc.setLast_tx_date(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
        accRepo.save(acc);

        System.out.println("Completed Interest calculation for accno: "+acc.getAccountno());
    }
}
