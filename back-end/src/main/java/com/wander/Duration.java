package com.wander;

import java.text.SimpleDateFormat;
import java.util.Date;

// This class represents a time duration. 
// Time strings must be in the form yyyy-MM-dd HH:mm:ss
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

    // check if the given duration is within this duration window.
    public boolean durationIsSubset(Duration d) throws java.lang.Exception {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date s1 = null;
        Date s2, e1, e2 = null;
       
        boolean start = true;
        if(d.getStartTime() != null){
            s1 = dateFormat.parse(this.startTime);
            s2 = dateFormat.parse(d.getStartTime());
            start = s1.equals(s2) || s1.before(s2);
        }

        boolean end = true;
        if(d.getEndTime() != null){
            e1 = dateFormat.parse(this.startTime);
            e2 = dateFormat.parse(d.getEndTime());
            end = e1.before(e2) || e1.equals(e2);
        }
        
        return start && end;
    }
}