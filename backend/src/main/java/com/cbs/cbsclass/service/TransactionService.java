package com.cbs.cbsclass.service;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Transaction;
import com.cbs.cbsclass.repository.AccountRepo;
import com.cbs.cbsclass.repository.TransactionsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

@Transactional
@Service
public class TransactionService {
    @Autowired
    TransactionsRepository tr;
    @Autowired
    AccountRepo ar;
    public Transaction add(Transaction t){
        return tr.save(t);
    }
    public List<Transaction> getHistory(long accountno){
        return tr.findByAccountno(accountno);
    }

    public List<Transaction> getStatement(int month,long accountno){

        LocalDateTime ld = LocalDateTime.now();
        int year=ld.getYear();
        return tr.findTransactionRangeDate(accountno,month,year);
    }
    public String sendMoney(long accountno_s,long accountno_r,float amount) {
        Account rec = ar.findByAccountno(accountno_r);
        Account sd = ar.findByAccountno(accountno_s);
        if (sd==null||rec == null||sd.getBalance() < amount||!sd.isActive()||!rec.isActive()){
            if(sd==null) return "Incorrect Account number";
            else if(!sd.isActive()) return "Your Account is inactive";
            else if(rec == null) return "Incorrect Account number";
            else if(!rec.isActive()) return "Receiver Account is inactive";
            else if(sd.getBalance() < amount) return "Insufficent Balance in your account";
        }
        Transaction ntr = new Transaction();
        Transaction ntr_r = new Transaction();
        sd.setBalance(sd.getBalance() - amount);
        rec.setBalance(rec.getBalance() + amount);
        ntr.setTx_status("Success");
        ntr_r.setTx_status("Success");
        String transactionRefNo = UUID.randomUUID().toString().substring(0,10);
        LocalDateTime now = LocalDateTime.now();
        ntr.setType("Debit");
        ntr_r.setType("Credit");
        ntr.setTx_at(now);
        ntr_r.setTx_at(now);
        ntr.setTx_mode("Branch");
        ntr_r.setTx_mode("Branch");
        ntr.setTx_ref_no(transactionRefNo);
        ntr_r.setTx_ref_no(transactionRefNo);
        ntr.setAccountno(accountno_s);
        ntr_r.setAccountno(accountno_r);
        ntr.setAmount(amount);
        ntr_r.setAmount(amount);
        ntr.setTx_from(accountno_s);
        ntr_r.setTx_from(accountno_s);
        ntr.setTx_to(accountno_r);
        ntr_r.setTx_to(accountno_r);
        ar.save(sd);
        ar.save(rec);
        ntr.setBalance(sd.getBalance());
        ntr_r.setBalance(rec.getBalance());
        add(ntr);
        add(ntr_r);
        return "Transaction Status: "+ntr.getTx_status()+" transaction reference id"+ ntr.getTx_ref_no();
    }
}
