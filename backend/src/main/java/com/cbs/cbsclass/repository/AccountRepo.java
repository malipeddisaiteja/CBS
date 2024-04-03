package com.cbs.cbsclass.repository;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepo extends CrudRepository<Account,Integer>, JpaRepository<Account,Integer> {

    public Account findByAccountno(long accountno);
    public List<Account> findByCustid(String custid);


}
