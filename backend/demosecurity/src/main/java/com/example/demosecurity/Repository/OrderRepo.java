package com.example.demosecurity.Repository;

import com.example.demosecurity.model.dto.Bom;
import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {

    @Query("select o FROM orders o where o.Id = :id")
    Order findOrdersById(@Param("id") Long id);

    @Query("select DISTINCT o.status FROM orders o ")
    List<Integer> getByStatus();

    @Query("select o FROM orders o where o.status = :status")
    List<Order> findAllByStatus(@Param("status") Integer status);

    @Query("select o FROM orders o where o.users.username = :username")
    List<Order> findAllByUsername(@Param("username") String username);

    @Query("select o FROM orders o where o.users.username = :username and o.status = :status")
    List<Order> findAllByUsernameAndStatus(@Param("status") Integer status,@Param("username") String username);


    List<Order> findAllByBoomGreaterThanAndPhone(Integer boom,String Phone);

    @Query("select  DISTINCT o.phone  FROM orders o where o.boom > :boom")
    List<String> findDistinctByPhone(@Param("boom") Integer boom);

    @Query("select count(o.status) FROM orders o where o.boom > :boom and o.phone =:phone")
    Integer countByBoomAndBoomGreaterThanEqual(@Param("boom") Integer boom,@Param("phone") String phone);

    Order findOrderBySku(String sku);
    Order findOrderBySkuAndUsers(String sku,String user);


}
