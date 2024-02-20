package com.example.wander;

import java.util.Set;

import org.w3c.dom.events.Event;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;

public class Events{
    private Map<Integer, Event> allEvents;
    private Set<Integer> savedEvents;

    private List<Event> currentShownEvents;

    public static final int DISTANCE_MAX = 100;

    // Inititalize the set of all events from the csv
    public Events() throws IOException{
        allEvents = new HashMap<>();
        String csvFile = "../database/events.csv"; // Ruh Roh
        
        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            String[] nextLine;
            
            // Read in the first line, which has the headers.
            nextLine = reader.readNext();

            // Read each line from the file until there are no more lines
            while ((nextLine = reader.readNext()) != null) {
                // trim each element
                for(int i = 0; i < nextLine.length; i++){
                    nextLine[i] = nextLine[i].trim();
                }

                Event event = new Event(nextLine);
                System.out.println(event.toJson());
                allEvents.put(event.getEventId(), event);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    // Displays the set of events that have the event_type and are within the time range (if given).
    // Event in index 0 is the closest then longer.
    // distance is birds eye
    public List<Event> getEvents(Coordinates coordinates, Filters filters){
        // get a list of all events within the distance, then sort by distance.
        // Insertion sort.

        List<Event> events = new ArrayList<>();
        for(Event e: allEvents.entrySet()){
            double distance = getBirdsEyeDistance(coordinates, e.getCoordinates());
            if(distance > DISTANCE_MAX) continue;

            events.add(e);
        }

        // sort List<Event> by distance
        Collections.sort(events, new Comparator<Coordinates>() {
            @Override
            public int compare(Coordinates p1, Coordinates p2) {
                double dist1 = getBirdsEyeDistance(coordinates, p1.getCoordinates());
                double dist2 = getBirdsEyeDistance(coordinates, p2.getCoordinates());
                return Double.compare(dist1, dist2);
            }
        });

        currentShownEvents = events;
        return events;
    }

    private double getBirdsEyeDistance(Coordinates left, Coordinates right){
        double changeX = left.x - right.x;
        double changeY = left.y - right.y;
        return Math.sqrt(changeX * changeX + changeY * changeY);
    }

    // save the event to savedEvents
    public boolean saveEvent(int id){
        savedEvents.add(id);
        return true;
    }
    
    // send the image to the front end
    // returns the map of id name of the flyer.
    public Map<Integer, String> getEventFlyer(int id,  Filters filters){
        // TODO implement once the Event is finalized.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }
    
    // return the saved events and mini-flyers.
    // return is map from event to the mini flyer.
    public Map<Integer, String> getSavedEvents(){
        // TODO implement once the Event is finalized and the method of return.
        throw new UnsupportedOperationException("This method is not yet implemented");
    }


}