package com.wander;

// This class represents coordinates on a map
public class Coordinates{
    private double longitude;
    private double latitude;

    // (x, y) is (latitude, longitude)
    public Coordinates(double latitude, double longitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public double getLongitude(){
        return this.longitude;
    }

    public double getLatitude(){
        return this.latitude;
    }
}