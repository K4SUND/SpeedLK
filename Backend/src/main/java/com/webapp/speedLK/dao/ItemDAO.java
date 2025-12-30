package com.webapp.speedLK.dao;

import com.webapp.speedLK.model.Item;

import java.util.List;

public interface ItemDAO {

    String addItem(Item item);
    String updateItem(Item item);
    Item   getItembyID(int id);
    String deleteByID(int id);

    List<Item> getAllItems();

    List<Item> getItemsbyUserID(int id);

    List<Item> getItemsbyLocationID(int id);


}
