package com.cbs.cbsclass.repository;

import com.cbs.cbsclass.dao.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends CrudRepository<Customer,Integer>, JpaRepository<Customer,Integer> {
    Customer findByCustid(String custid);
}
