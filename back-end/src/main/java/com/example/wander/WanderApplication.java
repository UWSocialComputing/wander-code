package com.example.wander;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import java.util.List;

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


    @GetMapping("/heartbeat")
    public String hello(@RequestParam(value = "name", defaultValue = "<3") String name) {
      return String.format("Heartbeat %s!", name);
    }

    @GetMapping("/getEvents")
    public String getEvents(@RequestBody GetEventsRequest request) {

      
      // Parse into filters
      Gson gson = new Gson();
      return gson.toJson(events.getEvents(request.getCoordinates(), request.getFilters()));
    }

    @GetMapping("/getAllEvents")
    public String getEvents() {
      // Parse into filters
      Gson gson = new Gson();
      return gson.toJson(events.getEvents(new Coordinates(0,0), null));
    }
}

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