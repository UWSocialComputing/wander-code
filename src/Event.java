import java.time.LocalDateTime;
import java.util.Optional;

public class Event{
    private String name; 
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String host;
    private Double cost;
    private String flyerPath;

    // Optional Fields
    private Optional<String> url;
    private Optional<String> eventDetails;

    public Event(String name, LocalDateTime startTime, LocalDateTime endTime, String location, 
                String host, Double cost, String flyerPath, Optional<String> url,
                Optional<String> eventDetails){
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.host = host;
        this.cost = cost;
        this.flyerPath = flyerPath;
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

    public String getLocation(){
        return location;
    }

    public String getHost(){
        return host;
    }

    // returns null if no url was given
    public String getUrl(){
        if(url.isPresent() && !url.isEmpty()){
            return url.get();
        } else{
            return null;
        }
    }

    public Double getCost(){
        return cost;
    }

    // returns null if no event details were specified
    public String getEventDetails(){
        if(eventDetails.isPresent() && !eventDetails.isEmpty()){
            return eventDetails.get();
        } else{
            return null;
        }
    }

    public String getFlyerPath(){
        return flyerPath;
    }
}

