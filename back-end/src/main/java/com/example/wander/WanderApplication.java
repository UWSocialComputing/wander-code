package com.example.wander;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.FileNotFoundException;
import java.io.IOException;


import com.google.gson.Gson;

// Controller class for the backend
@CrossOrigin(origins = "http://localhost:3000")
@SpringBootApplication
@RestController
public class WanderApplication {
    private static Events events;
    public static void main(String[] args) {
      SpringApplication.run(WanderApplication.class, args);

      try{
        events = new Events();
      } catch (Exception e){
        e.printStackTrace();
      }
    }

    // Health
    @GetMapping("/heartbeat")
    public String hello(@RequestParam(value = "name", defaultValue = "<3") String name) {
      return String.format("Heartbeat %s!", name);
    }

    // returns events and applies given filter, and checks distance.
    @GetMapping("/getEvents")
    public String getEvents(@RequestBody GetEventsRequest request) {
      Gson gson = new Gson();
      return gson.toJson(events.getEvents(request.getCoordinates(), request.getFilters()));
    }

    @GetMapping("/flyer/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        // Load the image file as a Resource
        Resource resource = new FileSystemResource("../database/images/flyers/" + imageName);

        // Check if the resource exists
        if (!resource.exists()) {
            throw new FileNotFoundException("Image not found: " + imageName);
        }

        // Set content type
        String contentType = "image/png"; // Set the appropriate content type for your image
        MediaType mediaType = MediaType.parseMediaType(contentType);

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resource);
    }

    // returns all events
    @GetMapping("/getAllEvents")
    public String getAllEvents() {
      // Parse into filters
      Gson gson = new Gson();
      return gson.toJson(events.getAllEvents());
    }

    // Adds an event to saved events.
    @GetMapping("/saveEvent")
    public String saveEvent(@RequestParam(value = "id", defaultValue = "") String id) {
      Gson gson = new Gson();
      if(id.length() == 0) return gson.toJson(false);
      return gson.toJson(events.saveEvent(Integer.parseInt(id)));
    }

    // returns all saved events
    @GetMapping("/getSavedEvents")
    public String getSavedEvents() {
      Gson gson = new Gson();
      return gson.toJson(events.getSavedEvents());
    }

}

// Request object for getting events with filters.
class GetEventsRequest {
  private Coordinates coordinates;
  private Filters filters;

  public GetEventsRequest(Coordinates coordinates, Filters filters){
    this.coordinates = coordinates;
    this.filters = filters;
  }

  public Coordinates getCoordinates(){
    return coordinates;
  }

  public Filters getFilters(){
    return filters;
  }
}