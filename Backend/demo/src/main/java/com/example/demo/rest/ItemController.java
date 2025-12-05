package com.example.demo.rest;


import com.example.demo.model.Item;
import com.example.demo.model.Location;
import com.example.demo.model.User;
import com.example.demo.service.FirebaseStorageService;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ItemController {

    private ItemService itemService;

    private FirebaseStorageService firebaseStorageService;


    @Autowired
    public ItemController(ItemService itemService, FirebaseStorageService firebaseStorageService) {
        this.itemService = itemService;
        this.firebaseStorageService = firebaseStorageService;
    }


    @GetMapping("/item/{id}")
    public ResponseEntity<Item> getItemByID(@PathVariable int id) {
        Item item = itemService.getItemByID(id);
        if (item == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return new ResponseEntity<>(item, HttpStatus.OK);
    }


    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        if (items == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/items-by-user-id/{id}")
    public ResponseEntity<List<Item>> getItemsByUser(@PathVariable int id) {
        List<Item> items = itemService.getItemsByUser(id);
        if (items == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/items-by-location-id/{id}")
    public ResponseEntity<List<Item>> getItemsByLocation(@PathVariable int id) {
        List<Item> itemList = itemService.getItemsByLocation(id);

        if (itemList == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(itemList, HttpStatus.OK);
    }


    @PostMapping("/add-item")
    public ResponseEntity<String> addItem(@RequestParam("brand") String brand,
                                          @RequestParam("model") String model,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") double price,
                                          @RequestParam("locationId") int locationId,
                                          @RequestParam("userId") int userId,
                                          @RequestParam("file") MultipartFile file) {

        try {

            String filename = firebaseStorageService.uploadImage(file);

            Item item = new Item();
            item.setBrand(brand);
            item.setModel(model);
            item.setDescription(description);
            item.setPrice(price);
            item.setImageUrl(filename);
            item.setUser(new User(userId));
            item.setLocation(new Location(locationId));

            itemService.addItem(item);
            return new ResponseEntity<>("Item Added", HttpStatus.CREATED);


        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/delete-item/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id) {
        try {
            Item item = itemService.getItemByID(id);
            String imageUrl = item.getImageUrl();
            firebaseStorageService.deleteImage(imageUrl);
            return new ResponseEntity<>(itemService.deleteById(id), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/update-item")
    public ResponseEntity<String> updateByItemId(
            @RequestParam("Id") int id,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "model", required = false) String model,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) String price,
            @RequestParam(value = "locationId", required = false) String locationId,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            //retrieve exist item
            Item item = itemService.getItemByID(id);

            if (brand != null) {
                item.setBrand(brand);
            }
            if (model != null) {
                item.setModel(model);
            }

            if (description != null) {
                item.setDescription(description);
            }

            if (price != null) {
                double doublePrice = Double.parseDouble(price);
                item.setPrice(doublePrice);
            }


            //location Id exist everytime -> frontend
            if (locationId != null) {
                int intLocationId = Integer.parseInt(locationId);
                item.setLocation(new Location(intLocationId));
            }

            if (file != null) {
                String imageUrl = item.getImageUrl();


                try {
                    firebaseStorageService.deleteImage(imageUrl);
                } catch (Exception e) {
// do nothing
                }

                String newFileName = firebaseStorageService.uploadImage(file);
                item.setImageUrl(newFileName);
            }

            String response = itemService.updateItem(item);


            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }


    }


}
