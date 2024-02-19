package com.example.wander;

import java.time.LocalDateTime;

public class Duration{
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;

    public Duration(LocalDateTime startTime, LocalDateTime endTime){
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public LocalDateTime getStartTime(){
        return startTime;
    }

    public LocalDateTime getEndTime(){
        return endTime;
    }
}