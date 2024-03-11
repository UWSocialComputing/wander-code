package com.wander;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.google.gson.Gson;

// This class represent an Event
public class Event{
    private int eventId;
    private String name;
    private EventType eventType;

    private Duration duration;
    private Address location;
    private String host;
    private Double cost;

    // images is flyer/fileID.png or miniFlyer/fileID.png
    private Attatchments images;

    // Map coordinates
    private Coordinates coordinates;

    // Optional Fields
    private String url;
    private String eventDetails;

    // From a line in the csv, instansitate the event object.
    public Event(String[] line){
        this.eventId = Integer.parseInt(line[0]);
        this.name = line[1];
        this.eventType = EventType.valueOf(line[2]);

        String startTime = line[3];
        String endTime = line[4];

        this.duration = new Duration (startTime, endTime);

        //
        this.location = new Address(line[5] == "" ? null : line[5], line[6] == "" ? null : line[6],
                                    line[7] == "" ? null : line[7], line[8] == "" ? null : line[8],
                                    line[9] == "" ? null : line[9],
                                    line[10] == "" ? null : Integer.parseInt(line[10]));
        this.host = line[11];
        this.cost = Double.parseDouble(line[12]);

        String flyerPath = "database/images/flyer" + eventId + ".png";
        String miniFlyerPath = "database/images/miniflyer" + eventId + ".png";
        this.images = new Attatchments(flyerPath, miniFlyerPath);
        this.coordinates = new Coordinates(Double.parseDouble(line[13]), Double.parseDouble(line[14]));
        this.url = line[15];
        this.eventDetails = line[16];
    }

    // instansitate event object from params
    public Event(int eventID, String name, EventType eventType, Duration duration, Address location,
                String host, Double cost, Attatchments images, Coordinates coordinates, String url,
                String eventDetails){
        eventId = eventID;
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

    // Getters

    public int getEventId(){
        return eventId;
    }

    public String getName(){
        return name;
    }

    public String getStartTime(){
        return duration.getStartTime();
    }

    public String getEndTime(){
        return duration.getEndTime();
    }

    public Duration getDuration(){
        return duration;
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

    public EventType getEventType(){
        return eventType;
    }
}

