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
            end = e2.before(e1);
        }

        if(s1 != null && e2 != null){
            end = end && e2.equals(s1);
        }
        
        return start && end;
    }
}