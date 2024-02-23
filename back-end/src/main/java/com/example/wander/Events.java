package com.example.wander;

import java.util.Comparator;
import com.google.gson.Gson;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Collections;
import com.opencsv.CSVReader;
import java.io.FileReader;
import java.io.IOException;

public class Events{
    private Map<Integer, Event> allEvents;
    private Map<Integer, Event> savedEvents;

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
        Gson gson = new Gson();
        // get a list of all events within the distance, then sort by distance.
        // Insertion sort.
        
        List<Event> events = new ArrayList<>();
        for(Event e: allEvents.values()){
            // check if the filters apply
            if(filters != null && !filters.eventWithinFilter(e)) continue;

            // check if event is within the distance range
            double distance = getBirdsEyeDistance(coordinates, e.getCoordinates());
            if(distance >= DISTANCE_MAX) continue;

            events.add(e);
        }

        // sort List<Event> by distance
        Collections.sort(events, new Comparator<Event>() {
            @Override
            public int compare(Event e1, Event e2) {
                Coordinates p1 = e1.getCoordinates();
                Coordinates p2 = e2.getCoordinates();
                double dist1 = getBirdsEyeDistance(coordinates, p1);
                double dist2 = getBirdsEyeDistance(coordinates, p2);
                return Double.compare(dist1, dist2);
            }
        });

        return events;
    }

    private double getBirdsEyeDistance(Coordinates left, Coordinates right){
        double changeX = left.getX() - right.getX();
        double changeY = left.getY() - right.getY();
        return Math.sqrt(changeX * changeX + changeY * changeY);
    }

    // save the event to savedEvents
    public boolean saveEvent(int id){
        if(!allEvents.containsKey(id)) return false;
        savedEvents.put(id, allEvents.get(id));
        return true;
    }
    
    // send the image to the front end
    // returns the map of id name of the flyer.
    // returns a list of all events sorted by distance
    public List<Event> getEventFlyer(int id,  Filters filters){
        if(!allEvents.containsKey(id)) return null;
        return getEvents(allEvents.get(id).getCoordinates(), filters);
    }
    
    // return the saved events and mini-flyers.
    // return is map from event to the mini flyer.
    public Map<Integer, Event> getSavedEvents(){
        return Map.copyOf(savedEvents);
    }


}