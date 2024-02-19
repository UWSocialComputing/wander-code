package com.example.wander;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.google.gson.Gson;


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

    public Event(String[] line){
        this.eventId = Integer.parseInt(line[0]);
        this.name = line[1];

        switch(Integer.parseInt(line[2])){
            case 0:
                this.eventType = EventType.CULTURAL;
                break;
            case 1: 
                this.eventType = EventType.SPORTS;
                break;
            case 2: 
                this.eventType = EventType.THEATER;
                break;
            default:
                this.eventType = EventType.OTHER;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String startTime = LocalDateTime.parse(line[3], formatter).toString();
        String endTime = LocalDateTime.parse(line[4], formatter).toString();

        this.duration = new Duration (startTime, endTime);
        this.location = new Address(line[5], line[6], line[7], line[8], line[9], Integer.parseInt(line[10]));
        this.host = line[11];
        this.cost = Double.parseDouble(line[12]);

        String flyerPath = "../database/images/flyer" + eventId + ".png";
        String miniFlyerPath = "../database/images/miniflyer" + eventId + ".png";
        this.images = new Attatchments(flyerPath, miniFlyerPath);
        this.coordinates = new Coordinates(Integer.parseInt(line[13]), Integer.parseInt(line[14]));
        this.url = line[15];
        this.eventDetails = line[16];
    }

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

    public String toJson(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }

}

