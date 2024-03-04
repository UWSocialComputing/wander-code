import "./Filter.css";

import { ChangeEvent, Component } from "react";
import { WtmEventType, Duration, PriceRange } from "./wtmEvent";
import { DURATION_END_DATE_MAX, PRICE_RANGE_MAX } from "./constants";

interface FilterProps {
  /** The new filters that have been chosen. */
  onChange(duration: Duration, eventTypes: WtmEventType[], priceRange: PriceRange): void;
}

interface FilterState {
  /** Filter Duration.startTime min date allowed. */
  duration_start_date_min: string;

  /** WtmEvent start date filter. Default is current DateTime. */
  eventStart: Date;

  /** WtmEvent end date filter. Default is current DateTime. */
  eventEnd: Date;

  /** WtmEventType filters. Default is all. */
  eventTypes: JSX.Element[];

  /** Helper for eventTypes. Contains enum key for each eventTypes value that is checked. */
  currChecked: WtmEventType[];

  /** PriceRange filter. Default is 0 to  */
  priceRange: PriceRange;
}

/**
 * The Map sidebar that allows the user to select different WtmEvent filters.
 */
class Filter extends Component<FilterProps, FilterState>  {
  constructor(props: any) {
    super(props);

    let eventStart = new Date();
    eventStart.setSeconds(0, 0);
    let eventEnd = new Date(eventStart);
    eventEnd.setHours(23, 59, 0, 0);

    let eventTypes: JSX.Element[] = [];
    for (const eventType of Object.values(WtmEventType)) {
      eventTypes.push(
        <div key={eventType}>
          <input key={eventType} type="checkbox" id={eventType.toString()} value={eventType} onChange={this.onEventTypeCheck} defaultChecked/>
          <label>{eventType}</label>
        </div>
      );
    }

    let priceRange: PriceRange = {min: 0, max: PRICE_RANGE_MAX};

    this.state = {
      duration_start_date_min: this.dateToFilterString(eventStart),
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventTypes: eventTypes,
      currChecked: Object.keys(WtmEventType) as Array<WtmEventType>,
      priceRange: priceRange
    };
  }

  /**
   * Stores the selection of a new start date filter.
   * @param event data of the changed start date
   */
  onStartDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let newStart: Date = this.filterStringToDate(event.target.value);
    let newEnd: Date = this.state.eventEnd;
    if (newStart > newEnd) {
      newEnd = newStart;
    }
    this.setState({
      eventStart: newStart,
      eventEnd: newEnd
    }, this.applyFilters);
  }

  /**
   * Stores the selection of a new end date filter.
   * @param event data of the changed end date
   */
  onEndDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let newEventEnd = this.filterStringToDate(event.target.value);
    console.log(newEventEnd)
    this.setState({
      eventEnd: newEventEnd
    }, this.applyFilters);
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
      updatedChecked.splice(index, 1);
    }

    this.setState({
      currChecked: updatedChecked
    }, this.applyFilters);
  }

  /**
   * Communicates the Duration (eventStart to eventEnd) and a WtmEventType list,
   * where each element of the WtmEventType list is a checked value in eventType.
   */
  applyFilters = () => {
    const startTime: string = this.dateToDurationString(this.state.eventStart);
    const endTime: string = this.dateToDurationString(this.state.eventEnd);

    this.props.onChange({startTime: startTime, endTime: endTime}, this.state.currChecked, this.state.priceRange);
  }

  /**
   * Translates the given date to a string in format "YYYY-MM-DD hh:mm".
   * @param date date to format
   * @returns given date as a string in format "YYYY-MM-DD hh:mm"
   */
  // TODO
  dateToDurationString = (date: Date): string => {
    let str = date.getFullYear().toString() + "-";

    let month = date.getMonth() + 1;  // Date has zero based month numbering
    if (month < 10) {
      str = str + "0";
    }
    str = str + month.toString() + "-";

    let day = date.getDate();
    if (day < 10) {
      str = str + "0";
    }
    str = str + day.toString() + " ";

    let hours = date.getHours();  // TODO: fix hour for prefix 0
    str = str + hours.toString() + ":";

    let mins = date.getMinutes();  // TODO: fix hour for prefix 0

    return str + mins.toString() + ":00";
  }

  /**
   * Translates the given date to a string in format "YYYY-MM-DDThh:mm".
   * @param date date to format
   * @returns given date as a string in format "YYYY-MM-DDThh:mm"
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
      str = str + "0";
    }
    str = str + day.toString() + "T";

    let hours = date.getHours();
    if (hours < 10) {
      str = str + "0";
    }
    str = str + hours.toString() + ":";

    let mins = date.getMinutes();
    if (mins < 10) {
      str = str + "0";
    }
    return str + mins.toString();
  }

  /**
   * Translates the given dateStr to a Date
   * @param dateStr string to convert to Date
   * @requires dateStr in format "YYYY-MM-DDThh:mm"
   * @returns given dateStr as a Date
   */
  filterStringToDate = (dateStr: String): Date => {
    let dateTimeParts: string[] = dateStr.split("T");

    let dateParts: string[] = dateTimeParts[0].split("-");
    let year: number = parseInt(dateParts[0]);
    let month: number = parseInt(dateParts[1]);
    let day: number = parseInt(dateParts[2]);

    let timeParts: string[] = dateTimeParts[1].split(":");
    let hours: number =  parseInt(timeParts[0]);
    let mins: number =  parseInt(timeParts[1]);

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(mins)) {
      console.log("ERROR: Date selector gave non-numerical date.")
    }

    let date: Date = new Date();
    date.setFullYear(year, month - 1, day);
    date.setHours(hours, mins, 0, 0);
    return date;
  }

  render() {
    // Create correctly formatted start date for selector
    let startDateValue = this.dateToFilterString(this.state.eventStart);

    // Create correctly formatted end date for selector
    let endDateValue = this.dateToFilterString(this.state.eventEnd);

    return (
      <div id="filter">
        <h2>Filters</h2>

        <div id="duration">
          <h4>Date Range</h4>
          <div>
            <label>Start date:</label>
            <input type="datetime-local" id="start" name="duration-start" value={startDateValue} min={this.state.duration_start_date_min} max={DURATION_END_DATE_MAX} onChange={this.onStartDateSelection}/>
          </div>
          <div>
            <label>End date:</label>
            <input type="datetime-local" id="end" name="duration-end" value={endDateValue} min={startDateValue} max={DURATION_END_DATE_MAX} onChange={this.onEndDateSelection}/>
          </div>
        </div>

        <div>
          <h4>Type of Event</h4>
          {this.state.eventTypes}
        </div>
      </div>
    );
  }
}

export default Filter;