package com.example.wander;

// This class represents coordinates on a map
public class Coordinates{
    private double x;
    private double  y;

    public Coordinates(int x, int y){
        this.x = x;
        this.y = y;
    }

    public double getX(){
        return x;
    }

    public double getY(){
        return y;
    }
}