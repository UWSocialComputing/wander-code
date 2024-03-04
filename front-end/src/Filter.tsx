import "./Filter.css";

import React, { ChangeEvent, Component } from "react";
import { WtmEventType, Duration } from "./wtmEvent";
import { MAX_DURATION_END_DATE } from "./constants";

interface FilterProps {
  /** The new filters that have been chosen. */
  onChange(duration: Duration, eventTypes: WtmEventType[]): void;
}

interface FilterState {
  /** WtmEvent start date filter. Default is current DateTime. */
  eventStart: Date;

  /** WtmEvent end date filter. Default is current DateTime. */
  eventEnd: Date;

  /** WtmEventType filters. */
  eventTypes: JSX.Element[];

  /** Helper for eventTypes. Contains enum key for each eventTypes value that is checked. */
  currChecked: WtmEventType[];
}

/**
 * The Map sidebar that allows the user to select different WtmEvent filters.
 */
class Filter extends Component<FilterProps, FilterState>  {
  constructor(props: any) {
    super(props);

    let date = new Date();

    let eventTypes: JSX.Element[] = [];
    for (const eventType of Object.values(WtmEventType)) {
      eventTypes.push(
        <div key={eventType}>
          <input key={eventType} type="checkbox" id={eventType.toString()} value={eventType} onChange={this.onEventTypeCheck} defaultChecked/>
          <label>{eventType}</label>
        </div>
      );
    }

    this.state = {
      eventStart: date,
      eventEnd: date,
      eventTypes: eventTypes,
      currChecked: Object.keys(WtmEventType) as Array<WtmEventType>,
    };
  }

  /**
   * Stores the selection of a new start date filter.
   * @param event data of the changed start date
   */
  onStartDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      eventStart: this.filterStringToDate(event.target.value)
    });
  }

  /**
   * Stores the selection of a new end date filter.
   * @param event data of the changed end date
   */
  onEndDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      eventEnd: this.filterStringToDate(event.target.value)
    });
  }

  /**
   * Updates currChecked with new status of the eventType, event.
   * @param event data of the (un)checked eventType
   */
  onEventTypeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedChecked = this.state.currChecked;

    let enumVal: WtmEventType = Object.keys(WtmEventType)[Object.values(WtmEventType).indexOf(event.target.value as WtmEventType)] as WtmEventType;
    let index = this.state.currChecked.indexOf(enumVal);
    // Not found, so need to "check" by adding to currChecked
    if (index === -1) {
      updatedChecked.push(enumVal);

    // Found, so need to "uncheck" by removing from currChecked
    } else {
      updatedChecked.splice(index, 1)
    }

    this.setState({
      currChecked: updatedChecked
    });
  }

  /**
   * Communicates the Duration (eventStart to eventEnd) and a WtmEventType list,
   * where each element of the WtmEventType list is a checked value in eventType.
   */
  onApplyFiltersClick = () => {
    const startTime: string = "";  // TODO
    const endTime: string = "";  // TODO

    this.props.onChange({startTime: startTime, endTime: endTime}, this.state.currChecked);
  }

  /**
   * Translates the given date to a string in format "YYYY-MM-DD".
   * @param date date to format
   * @returns given date as a string in format "YYYY-MM-DD"
   */
  dateToFilterString = (date: Date): string => {
    let str = date.getFullYear().toString() + "-";

    let month = date.getMonth() + 1;  // Date has zero based month numbering
    if (month < 10) {
      str = str + "0";
    }
    str = str + month.toString() + "-";

    let day = date.getDate();
    if (day < 10) {
      str = str+ "0";
    }
    return str + day.toString();
  }

  /**
   * Translates the given dateStr to a Date
   * @param dateStr string to convert to Date
   * @requires dateStr in format "YYYY-MM-DD"
   * @returns given dateStr as a Date
   */
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
    let startDateValue = this.dateToFilterString(this.state.eventStart);

    // Create correctly formatted end date for selector
    let endDateValue = startDateValue;
    if (this.state.eventStart < this.state.eventEnd) {
      endDateValue = this.dateToFilterString(this.state.eventEnd);
    }

    return (
      <div id="filter">
        <h2>Filters</h2>

        <div id="duration">
          <h4>Date Range</h4>
          <div>
            <label>Start date:</label>
            <input type="date" id="start" name="duration-start" value={startDateValue} min={startDateValue} max={MAX_DURATION_END_DATE} onChange={this.onStartDateSelection} pattern="\d{4}-\d{2}-\d{2}"/>
          </div>
          <div>
            <label>End date:</label>
            <input type="date" id="end" name="duration-end" value={endDateValue} min={startDateValue} max={MAX_DURATION_END_DATE} onChange={this.onEndDateSelection} pattern="\d{4}-\d{2}-\d{2}"/>
          </div>
        </div>

        <div>
          <h4>Type of Event</h4>
          {this.state.eventTypes}
        </div>

        <button type="button" onClick={this.onApplyFiltersClick}>Apply</button>
      </div>
    );
  }
}

export default Filter;