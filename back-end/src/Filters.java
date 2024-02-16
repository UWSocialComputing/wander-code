public class Filters{
    private Duration duration;
    private EventType eventType;

    public Filters(Duration duration, EventType eventType){
        this.duration = duration;
        this.eventType = eventType;
    }

    public Duration getDuration(){
        return duration;
    }

    public EventType eventType(){
        return eventType;
    }
}