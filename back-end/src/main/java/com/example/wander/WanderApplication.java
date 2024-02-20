package com.example.wander;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Heartbeat %s!", name);
    }

    // @GetMapping("/getEvents")
    // public String getEvents(@RequestParam(value = "coordinates", defaultValue = "x:0,y:0") Coordinates coords, 
    //                         @RequestParam(value = "filters", defaultValue = "duration:null, EventType:null") Filters filters) {
    //   return String.format("Heartbeat %s!", name);
    // }
}