package com.example.demo.service;


import com.example.demo.dao.ItemDAO;
import com.example.demo.model.Item;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{


    ItemDAO itemDAO;


    @Autowired
    public ItemServiceImpl(ItemDAO itemDAO) {
        this.itemDAO = itemDAO;
    }

    @Override
    @Transactional
    public String addItem(Item item) {
        return itemDAO.addItem(item);
    }


    @Override
    public Item getItemByID(int id) {
        return itemDAO.getItembyID(id);
    }


    @Override
    @Transactional
    public String deleteById(int id) {
        return itemDAO.deleteByID(id);
    }

    @Override
    public List<Item> getAllItems() {
       return itemDAO.getAllItems();
    }

    @Override
    public List<Item> getItemsByUser(int id) {
        return itemDAO.getItemsbyUserID(id);
    }

    @Override
    public List<Item> getItemsByLocation(int id) {
        return itemDAO.getItemsbyLocationID(id);
    }

    @Override
    @Transactional
    public String updateItem(Item item) {
        return itemDAO.updateItem(item);
    }


}


