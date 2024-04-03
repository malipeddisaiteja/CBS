package com.cbs.cbsclass.repository;

import com.cbs.cbsclass.dao.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepo extends CrudRepository<Employee,Integer> {

    public Employee findByEmpid(int empid);
}
