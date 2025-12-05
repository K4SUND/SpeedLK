package com.example.demo.model;


import jakarta.persistence.*;

@Entity
@Table(name = "Location")
public class Location {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String province;
    private String district;


    public Location() {
    }

    public Location(int id, String province, String district) {
        this.id = id;
        this.province = province;
        this.district = district;
    }

    public Location(int locationId) {
        id = locationId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
}
