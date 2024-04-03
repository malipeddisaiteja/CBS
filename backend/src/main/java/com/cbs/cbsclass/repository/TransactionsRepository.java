package com.cbs.cbsclass.repository;

import com.cbs.cbsclass.dao.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transaction,Integer> {
     List<Transaction> findByAccountno(long accno);
     @Query("SELECT t FROM transaction t WHERE t.accountno = ?1 AND MONTH(t.tx_at) = ?2 AND YEAR(t.tx_at) = ?3")
    List<Transaction> findTransactionRangeDate(@Param("accountno") long accountno, @Param("month") int month, @Param("year") int year);

    @Query("SELECT t FROM transaction t WHERE tx_at <= ?1 and tx_from = ?2 order by tx_at desc limit 1")
    List<Transaction> findByDate(@Param("currDate") LocalDateTime currDate, @Param("tx_accno") long accno);

    @Query("SELECT t FROM transaction t WHERE t.accountno = ?1 AND t.interestamount IS NOT NULL AND t.tx_at BETWEEN ?2 AND ?3")
    List<Transaction> findIfInterestCredited(@Param("txTo") long txTo, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
