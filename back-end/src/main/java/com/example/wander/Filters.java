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
}