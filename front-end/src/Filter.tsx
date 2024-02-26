import "./Filter.css";

import React, { ChangeEvent, Component } from "react";
import { WtmEventType } from "./wtmEvent";
import { MAX_DURATION_END_DATE } from "./constants";

interface FilterProps {
  // TODO
}

interface FilterState {
  // WtmEvent start filter. Default is current DateTime.
  eventStartFilter: Date;

  // WtmEvent end filter. Default is current Date at midnight.
  eventEndFilter: Date;

  // WtmEventType filters.
  eventTypeFilters: JSX.Element[];
} 

class Filter extends Component<FilterProps, FilterState>  {
  constructor(props: any) {
    super(props);

    let startDate = new Date();
    let endDate = startDate;
    endDate.setHours(23, 59, 59);

    let wtmEventTypes: JSX.Element[] = [];
    for (const wtmEventType of Object.values(WtmEventType)) {
      wtmEventTypes.push(
        <div key={wtmEventType}> 
          <input type="checkbox" id={wtmEventType}/> 
          <label>{wtmEventType}</label>
        </div>
      );
    }

    this.state = {
      eventStartFilter: startDate,
      eventEndFilter: endDate,
      eventTypeFilters: wtmEventTypes,
    };
  }

  onStartDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let eventStartDate: Date = this.filterStringToDate(event.target.value)
    this.setState({
      eventStartFilter: eventStartDate
    })
  }

  onEndDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let eventEndDate: Date = this.filterStringToDate(event.target.value)
    this.setState({
      eventEndFilter: eventEndDate
    })
  }

  /* Returns Date in format "YYYY-MM-DD" */
  dateToFilterString = (year: number, month: number, day: number): string => {
    let date = year.toString() + "-"
    
    month++;  // Date has zero based month numbering
    if (month < 10) {
      date = date + "0";
    }
    date = date + month.toString() + "-";

    if (day < 10) {
      date = date + "0";
    }
    return date + day.toString();
  }

  /* Returns "YYYY-MM-DD" as a Date */
  filterStringToDate = (dateStr: String): Date => {
    let dateParts: string[] = dateStr.split("-");
    let year = parseInt(dateParts[0])
    let month = parseInt(dateParts[1])
    let day = parseInt(dateParts[2])

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.log("ERROR: Date selector gave non-numerical date.")
    }

    let date: Date = new Date();
    date.setFullYear(year, month - 1, day);
    return date;
  }

  render() {
    // Create correctly formatted start date for selector
    let startDateValue = this.dateToFilterString(
      this.state.eventStartFilter.getFullYear(), 
      this.state.eventStartFilter.getMonth(), 
      this.state.eventStartFilter.getDate()
    );

    // Create correctly formatted end date for selector
    let endDateValue = startDateValue;
    if (this.state.eventStartFilter < this.state.eventEndFilter) {
      endDateValue = this.dateToFilterString(
        this.state.eventEndFilter.getFullYear(), 
        this.state.eventEndFilter.getMonth(), 
        this.state.eventEndFilter.getDate()
      );
    }
    
    return (
      <div id="filter">
        <div id="duration">
          <label>Start date:</label>
          <input type="date" id="start" name="duration-start" value={startDateValue} min={startDateValue} max={MAX_DURATION_END_DATE} onChange={this.onStartDateSelection} pattern="\d{4}-\d{2}-\d{2}"/>
          <label>End date:</label>
          <input type="date" id="end" name="duration-end" value={endDateValue} min={startDateValue} max={MAX_DURATION_END_DATE} onChange={this.onEndDateSelection} pattern="\d{4}-\d{2}-\d{2}"/>
        </div>
        {this.state.eventTypeFilters}
        {/* TODO: done/update filters button */}
      </div>
    );
  }
}

export default Filter;