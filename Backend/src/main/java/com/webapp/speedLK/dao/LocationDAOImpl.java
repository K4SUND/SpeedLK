package com.webapp.speedLK.dao;


import com.webapp.speedLK.model.Location;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LocationDAOImpl implements LocationDAO {


    EntityManager entityManager ;


    @Autowired
    public LocationDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Location getLocationByID(int id) {
       Location location= entityManager.find(Location.class,id);
       return  location;
    }

    @Override
    public int getLocationID(String province, String district) {

        String query = "SELECT l FROM Location l WHERE l.province= :province AND l.district= :district";
        Location location = entityManager.createQuery(query,Location.class)
                .setParameter("province",province)
                .setParameter("district",district)
                .getSingleResult();
        return location.getId();

    }
}
