package com.cbs.cbsclass.service;

import com.cbs.cbsclass.dao.Account;
import com.cbs.cbsclass.dao.Customer;
import com.cbs.cbsclass.dao.Employee;
import com.cbs.cbsclass.repository.AccountRepo;
import com.cbs.cbsclass.repository.CustomerRepo;
import com.cbs.cbsclass.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepo repo;

    @Autowired
    AccountRepo acrep;

    public Employee register(Employee e){
        System.out.println("entered register method "+e.getEmpid());
        if(repo.findByEmpid(e.getEmpid())!=null){
            System.out.println("emp is already registered");
            return null;
        }
        e.setCreatedat(LocalDateTime.now());
        e.setIsactive(true);
        System.out.println("Set register states");
        return repo.save(e);
    }

    public boolean authenticate(Employee emp){
        Employee e=repo.findByEmpid(emp.getEmpid());
        if(e!=null&&e.getPassword().equals(emp.getPassword()))
            return true;
        return false;
    }

    public void delete(int eid){
        Employee e=repo.findByEmpid(eid);
        repo.deleteById(e.getId());
    }

    public List<Account> getAll(){
        return acrep.findAll();
    }

}
