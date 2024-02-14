import java.time.LocalDateTime;

public class Event{
    private String name; 
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Address location;
    private String host;
    private Double cost;
    private String flyerPath;

    // Map coordinates
    private String coordinates;

    // Optional Fields
    private String url;
    private String eventDetails;

    public Event(String name, LocalDateTime startTime, LocalDateTime endTime, String nameOfLocation, String line1, String line2,
                String city, String state, int zipcode, 
                String host, Double cost, String flyerPath, String coordinates, String url,
                String eventDetails){
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = new Address(nameOfLocation, line1, line2, city, state, zipcode);
        this.host = host;
        this.cost = cost;
        this.flyerPath = flyerPath;
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

    public String getCoordinates(){
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

