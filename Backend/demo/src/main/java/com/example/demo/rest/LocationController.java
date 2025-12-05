package com.example.demo.rest;


import com.example.demo.model.Location;
import com.example.demo.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    private LocationService locationService;


    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/location/{Id}")
    public ResponseEntity<Location> getLocationById(@PathVariable int Id)
    {
        return new ResponseEntity<>(locationService.getLocationById(Id), HttpStatus.OK);
    }

    @GetMapping("/location-id")
    public ResponseEntity<Integer> getLocationId(@RequestParam String province, @RequestParam String district)
    {
        return new ResponseEntity<>(locationService.getLocationId(province,district),HttpStatus.OK);
    }

}
