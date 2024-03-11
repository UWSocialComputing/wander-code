package com.wander;

// this class represents a price range
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

    // Returns true if event e's price is within the price range
    public boolean priceWithinRange(Event e){
        double price = e.getCost();

        return price >= min && price <= max;
    }
}
