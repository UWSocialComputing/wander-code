package com.wander;

public class PriceRange {
    private double min;
    private double max;

    public PriceRange(double min, double max){
        this.min = min;
        this.max = max;
    }

    public double getMin(){
        return min;
    }

    public double getMax(){
        return max;
    }

    public boolean priceWithinRange(Event e){
        double price = e.getCost();

        return price >= min && price <= max;
    }
}
