public class Events(){
    private Set<Event> allEvents;
    private Set<Event> savedEvents;

    // Inititalize the set of all events from the csv
    public Events(){
        // TODO implement once the csv is finalized.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }

    // Displays the set of events that have the event_type and are within the time range (if given).
    // Event in index 0 is the closest then longer.
    // distance is birds eye
    public List<Event> getEvents(Coordinates coordinates, Filters filters){
        // TODO implement once Event object is finalized
        throw new UnsupportedOperationException("This method is not yet implemented");
    }

    // save the event to savedEvents
    public boolean saveEvent(int id){
        savedEvents.add(event);
    }
    
    // send the image to the front end
    // returns the map of id name of the flyer.
    public Map<int, String> getEventFlyer(int id,  Filters filters){
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