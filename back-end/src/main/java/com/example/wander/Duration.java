package com.example.wander;
import java.time.LocalDateTime;

public class Duration{
    private final String startTime;
    private final String endTime;

    public Duration(String startTime, String endTime){
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getStartTime(){
        return startTime;
    }

    public String getEndTime(){
        return endTime;
    }
}