package com.example.demo.dao;


import com.example.demo.model.Item;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemDAOImpl implements ItemDAO {

    private EntityManager entityManager ;

    @Autowired
    public ItemDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public String addItem(Item item) {
       Item savedItem =  entityManager.merge(item);
       return "Item Added";

    }
    @Override
    public String updateItem(Item item) {
        Item updateItem = entityManager.merge(item);
        return "Item Updated";

    }

    @Override
    public Item getItembyID(int id) {
        Item item = entityManager.find(Item.class,id);
        return item;
    }

    @Override
    public String deleteByID(int id) {

        Item item= entityManager.find(Item.class,id);
        entityManager.remove(item);
        return "Deleted";
    }

    @Override
    public List<Item> getAllItems() {

        TypedQuery<Item> itemTypedQuery = entityManager.createQuery("from Item",Item.class);
        List<Item> itemList = itemTypedQuery.getResultList();
        return itemList;

    }

    @Override
    public List<Item> getItemsbyUserID(int id) {
        String jpql = "Select i from Item i Where i.user.id = :userId";
        TypedQuery<Item> itemTypedQuery = entityManager.createQuery(jpql,Item.class);
        itemTypedQuery.setParameter("userId",id);
        List<Item> itemList = itemTypedQuery.getResultList();
        return itemList;
    }

    @Override
    public List<Item> getItemsbyLocationID(int id) {
        String jpql ="Select i from Item i Where i.location.id = :locationId";
        TypedQuery<Item> itemTypedQuery = entityManager.createQuery(jpql,Item.class);
        itemTypedQuery.setParameter("locationId",id);
        List<Item> itemList = itemTypedQuery.getResultList();

        if(itemList.isEmpty())
        {
            return null;
        }
        return itemList;
    }


}
