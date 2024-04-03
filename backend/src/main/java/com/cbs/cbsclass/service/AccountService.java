package com.cbs.cbsclass.service;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Transaction;
import com.cbs.cbsclass.repository.AccountRepo;
import com.cbs.cbsclass.repository.CustomerRepo;
import com.cbs.cbsclass.repository.TransactionsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Transactional
@Service
public class AccountService {

    @Autowired
AccountRepo repo;
    @Autowired
    TransactionsRepository tr;
    @Autowired
    InterestCalculationService ias;

    @Autowired
    TransactionService ts;
        public Account add(Account a){
            Random random = new Random();
            long randomNumber = random.nextLong() % 10000000000000000L;
            a.setAccountno(Math.abs(randomNumber));
            a.setIsActive(true);
            return repo.save(a);
        }
        public double getBalance(long accno){
            Account ac= repo.findByAccountno(accno);
            return ac.getBalance();
        }
        public String delete(long accno){
            System.out.println("******** Delete Request for accno: "+accno);
//            Account ac=repo.findByAccountno(repo.findByAccountno(accno).getId());
            Account ac=repo.findByAccountno(accno);
//            ias.calcInterestForAccountClosure(ac);
            ac.setIsActive(false);
            ac.setClosedat(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
            ac.setClosedby("System");
            repo.save(ac);
            return "Account Closed";
        }

        public void setTransaction(boolean credit,Account ac,float amt){
            Transaction ntr = new Transaction();
            if(credit){
                ntr.setType("Credit");
                ntr.setTx_from(0l);
                ntr.setTx_to(ac.getAccountno());
            }
            else{
                ntr.setType("Dedit");
                ntr.setTx_from(ac.getAccountno());
                ntr.setTx_to(0l);
            }
            ntr.setTx_status("Success");
            String transactionRefNo = UUID.randomUUID().toString().substring(0,10);
            LocalDateTime now = LocalDateTime.now();
            ntr.setTx_at(now);
            ntr.setTx_mode("Branch");
            ntr.setTx_ref_no(transactionRefNo);
            ntr.setAccountno(ac.getAccountno());
            ntr.setAmount(amt);
            ntr.setBalance(ac.getBalance());
            ts.add(ntr);
        }
        public String deposit(long accno,float amt){
            Account ac=repo.findByAccountno(accno);
            if(ac==null||!ac.isActive()){
                return "Deposit Failed";
            }
            float oldbal=ac.getBalance();
            ac.setBalance((float) (oldbal+amt));
            repo.save(ac);
            setTransaction(true,ac,amt);
            return "A/C Balance: "+ac.getBalance();
        }

        public String withdraw(long accno,float amt){
        Account ac=repo.findByAccountno(accno);
        if(ac==null||!ac.isActive()||ac.getBalance()<amt){
            return "Withdrawal Failed";
        }
        float oldbal=ac.getBalance();
        ac.setBalance(oldbal-amt);
        repo.save(ac);
            setTransaction(false,ac,amt);
        return "A/C Balance: "+ac.getBalance();
    }

    public List<Account> getAc(String custid) {
        System.out.println("in service getAc() for custid: "+custid);
         return repo.findByCustid(custid);
    }
}


