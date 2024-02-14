import java.time.LocalDateTime;

public class Event{
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

    public Event(String name, EventType eventType, Duration duration, Address location;
                String host, Double cost, Attatchments images, Coordinates coordinates, String url,
                String eventDetails){
        this.name = name;
        this.duration = duration.
        this.endTime = endTime;
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
        return startTime;
    }

    public LocalDateTime getEndTime(){
        return endTime;
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

    public String getFlyerPath(){
        return flyerPath;
    }

}

