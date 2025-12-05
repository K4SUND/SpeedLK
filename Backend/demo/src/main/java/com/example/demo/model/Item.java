package com.example.demo.model;


import com.example.demo.dto.UserDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "Item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    private int userId;
//    private int locationId;
    private String brand;


    private String model;
    private String description;
    private double price;

    private String imageUrl;


    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "location_Id")
    private Location location;



    public Item() {
    }

    public Item(int id, String brand, String model, String description, double price, String imageUrl, User user, Location location) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.user = user;
        this.location = location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }



    public UserDTO getUser() {
        return new UserDTO(user.getId(),user.getEmail(), user.getName(), user.getPhoneNumber());
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
