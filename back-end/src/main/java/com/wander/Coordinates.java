package com.wander;

// This class represents coordinates on a map
public class Coordinates{
    private double longitude;
    private double latitude;

    public Coordinates(double longitude, double latitude){
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public double getX(){
        return this.longitude;
    }

    public double getY(){
        return this.latitude;
    }
}