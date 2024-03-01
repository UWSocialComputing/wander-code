package com.wander;

import java.util.List;

// This class represents filters on an Event.
public class Filters{
    // Make this a set.
    private Duration duration;
    private List<EventType> eventType;

    public Filters(Duration duration, List<EventType> eventType){
        this.duration = duration;
        this.eventType = eventType;
    }

    public Duration getDuration(){
        return duration;
    }

    public List<EventType> eventType(){
        return eventType;
    }

    // Check if the event should be displayed given all applied filters 
    public boolean eventWithinFilter(Event e){
        // if event is not within time range.
        if(duration != null) {
            try {
                if (!duration.durationIsSubset(e.getDuration())) return false;
            } catch (Exception ex){
                // Exception occured.
                return false;
            }
        }

        // if event type matches
        if(eventType.isEmpty()) return false;
        if(!eventType.contains(e.getEventType())) return false;

        return true;
    }
}