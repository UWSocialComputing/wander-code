package com.wander;

import java.util.List;

// This class represents filters on an Event.
public class Filters{
    // Make this a set.
    private Duration duration;
    private List<EventType> eventType;
    private PriceRange priceRange;

    // public Filters(Duration duration, List<EventType> eventType){
    //     this.duration = duration;
    //     this.eventType = eventType;
    //     this.priceRange = null;
    // }

    public Filters(Duration duration, List<EventType> eventType, PriceRange priceRange){
        this.duration = duration;
        this.eventType = eventType;
        this.priceRange = priceRange;
    }

    public Duration getDuration(){
        return duration;
    }

    public List<EventType> eventType(){
        return eventType;
    }

    // Check if the event should be displayed given all applied filters 
    public boolean eventWithinFilter(Event e){
        // check if event is in the price range, if given.
        if(priceRange != null){
            if(!priceRange.priceWithinRange(e)) return false;
        }

        // if event is not within time range.
        if(duration != null) {
            try {
                if (!duration.durationIsSubset(e.getDuration())) return false;
            } catch (Exception ex){
                // Exception occured.
                System.out.println("Error parsing date");
                return false;
            }
        }

        // check if event type matches
        if(eventType == null || eventType.isEmpty()) return true; // no event specification given
        if(!eventType.contains(e.getEventType())) return false; // event type not what user wants

        return true;
    }
}