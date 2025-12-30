package com.webapp.speedLK.dao;

import com.webapp.speedLK.model.Location;

public interface LocationDAO {

    Location getLocationByID(int id);
    int getLocationID(String province,String district);

}
