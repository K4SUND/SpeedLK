package com.webapp.speedLK.service;

import com.webapp.speedLK.model.Location;

public interface LocationService {

    Location getLocationById(int id);
    int getLocationId(String province,String district);

}
