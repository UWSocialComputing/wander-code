package com.example.wander;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Duration{

    // time is in the form yyyy-MM-dd HH:mm:ss
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

    public boolean durationIsSubset(Duration d) throws java.lang.Exception {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date s1, s2, e1, e2 = null;
       
        s1 = dateFormat.parse(this.startTime);
        e1 = dateFormat.parse(this.startTime);

        s2 = dateFormat.parse(d.getStartTime());
        e2 = dateFormat.parse(d.getEndTime());
   

        // now, check that d is within this
        if((s1.equals(s2) || s1.before(s2)) && (e2.equals(s1) || e2.before(e1))){
            return true;
        }
        
        return false;
    }
}