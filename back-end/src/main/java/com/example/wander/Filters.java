package com.example.wander;

import java.util.Set;

public class Filters{
    // Make this a set.
    private Duration duration;
    private Set<EventType> eventType;

    public Filters(Duration duration, Set<EventType> eventType){
        this.duration = duration;
        this.eventType = eventType;
    }

    public Duration getDuration(){
        return duration;
    }

    public Set<EventType> eventType(){
        return eventType;
    }

    public boolean eventWithinFilter(Event e){
        // if event is not within time range.
        try{
            if(!e.getDuration().durationIsSubset(duration)) return false;
        } catch (Exception ex){
            // Exception occured.
            return false;
        }

        // if event type matches
        if(!eventType.contains(e.getEventType())) return false;

        return true;

    }
}