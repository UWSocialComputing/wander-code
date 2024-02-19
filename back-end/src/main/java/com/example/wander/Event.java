package com.example.wander;
import java.time.LocalDateTime;

public class Event{
    private int eventId;
    private String name; 
    private EventType eventType;

    private Duration duration;
    private Address location;
    private String host;
    private Double cost;
    private Attatchments images;

    // Map coordinates
    private Coordinates coordinates;

    // Optional Fields
    private String url;
    private String eventDetails;

    private static int MAX_ID = 0;

    public Event(String name, EventType eventType, Duration duration, Address location,
                String host, Double cost, Attatchments images, Coordinates coordinates, String url,
                String eventDetails){
        eventId = MAX_ID;
        MAX_ID++;
        this.name = name;
        this.duration = duration;
        this.location = location;
        this.host = host;
        this.cost = cost;
        this.images = images;
        this.coordinates = coordinates;
        this.url = url;
        this.eventDetails = eventDetails;
    }

    public String getName(){
        return name;
    }

    public LocalDateTime getStartTime(){
        return duration.getStartTime();
    }

    public LocalDateTime getEndTime(){
        return duration.getEndTime();
    }

    public Address getLocation(){
        return location;
    }

    public String getHost(){
        return host;
    }

    // returns null if no url was given
    public String getUrl(){
       return url;
    }

    public Double getCost(){
        return cost;
    }

    public Coordinates getCoordinates(){
        return coordinates;
    }

    // returns null if no event details were specified
    public String getEventDetails(){
        return eventDetails;
    }

    public String getFlyer(){
        return images.getFlyer();
    }

    public String getMiniFlyer(){
        return images.getMiniFlyer();
    }

}
