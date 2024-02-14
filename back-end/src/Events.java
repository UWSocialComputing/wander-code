public class Events(){
    private Set<Event> allEvents;
    private Set<Event> savedEvents;

    // Inititalize the set of all events from the csv
    public Events(){
        // TODO implement once the csv is finalized.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }

    // Displays the set of events that have the event_type and are within the time range (if given).
    public Set<Event> getEvents(Set<EventType> event_types, LocalDateTime startTimeRange, LocalDateTime endTimeRange){
        // TODO implement once Event object is finalized
        throw new UnsupportedOperationException("This method is not yet implemented");
    }

    // save the event to savedEvents
    public boolean saveEvent(Event event){
        savedEvents.add(event);
    }
    
    // send the image to the front end
    public String getEventFlyer(Event event){
        // TODO implement once the Event is finalized.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }
    
    // return the saved events and mini-flyers.
    // return is map from event to the mini flyer.
    public Map<Event, String> getSavedEvents(){
        // TODO implement once the Event is finalized and the method of return.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }


}