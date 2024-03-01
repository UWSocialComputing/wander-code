package com.wander;

// This class represents an address
public class Address {
    private final String nameOfLocation;
    private final String line1;
    private final String line2;
    private final String city;
    private final String state;
    private final Integer zipcode;

    // city, state required
    public Address(String nameOfLocation, String line1, String line2, String city, String state, Integer zipcode){
        this.nameOfLocation = nameOfLocation;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    public String toString(){
        String res = "";
        if(nameOfLocation != null){
            res += nameOfLocation + "/n";
        }

        if(line1 != null){
            res += line1 + "/n";
        }

        if(line2 != null){
            res += line2 + "/n";
        }

        res += city + ", " + state; 

        if(zipcode != null){
            res += " " + zipcode;
        }

        return res;
    }


}
