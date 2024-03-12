import "./Filter.css";

import { ChangeEvent, Component } from "react";
import { WtmEventType, Duration, PriceRange, wtmEventTypeKeyToValue } from "./wtmEvent";
import { dateToString, stringToDate } from "./util";
import { DURATION_END_DATE_MAX, PRICE_RANGE_MIN, PRICE_RANGE_MAX } from "./constants";

interface FilterProps {
  /** Current filter state. */
  durationStartDateMin: Date;
  duration: Duration;
  checkedEventTypes: WtmEventType[];
  priceRange: PriceRange;

  /** The new filters that have been chosen. */
  onChange(duration: Duration, eventTypes: WtmEventType[], priceRange: PriceRange): void;

  /** Trigger the filter panel collapse. */
  onCollapse(): void;
}

/**
 * The Map sidebar that allows the user to select different WtmEvent filters.
 */
class Filter extends Component<FilterProps, {}>  {

  /**
   * Stores the selection of a new start date filter.
   * @param event data of the changed start date
   */
  onStartDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedDuration: Duration = this.props.duration;

    let newStartTime: Date = stringToDate(event.target.value, true);
    updatedDuration.startTime = dateToString(newStartTime, false);


    let endTime: Date = stringToDate(updatedDuration.endTime, false);
    if (newStartTime > endTime) {
      updatedDuration.endTime = dateToString(newStartTime, false);
    }

    this.props.onChange(updatedDuration, this.props.checkedEventTypes, this.props.priceRange);
  }

  /**
   * Stores the selection of a new end date filter.
   * @param event data of the changed end date
   */
  onEndDateSelection = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedDuration: Duration = this.props.duration;

    let newEndTime: Date = stringToDate(event.target.value, true);
    updatedDuration.endTime = dateToString(newEndTime, false);

    this.props.onChange(updatedDuration, this.props.checkedEventTypes, this.props.priceRange);
  }

  /**
   * Updates currChecked with new status of the eventType, event.
   * @param event data of the (un)checked eventType
   */
  onEventTypeCheck = (eventValue: string) => {
    let updatedChecked = this.props.checkedEventTypes;

    let enumVal: WtmEventType = wtmEventTypeKeyToValue(eventValue);
    let index = updatedChecked.indexOf(enumVal);
    // Not found, so need to "check" by adding to currChecked
    if (index === -1) {
      console.log("check: " + eventValue.toString())
      updatedChecked.push(enumVal);

    // Found, so need to "uncheck" by removing from currChecked
    } else {
      console.log("uncheck: " + eventValue.toString())
      updatedChecked.splice(index, 1);
    }
    console.log(updatedChecked)

    this.props.onChange(this.props.duration, updatedChecked, this.props.priceRange);
  }

  /**
   * Stores the selection of a new priceRange max.
   * @param event data of the changed max price
   */
  onPriceRangeUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedPriceRange: PriceRange = this.props.priceRange;

    let priceRangeMax: number = parseInt(event.target.value);
    if (isNaN(priceRangeMax)) {
      console.log("ERROR: Price range selector gave non-numerical max price.")
    }
    updatedPriceRange.max = priceRangeMax;

    this.props.onChange(this.props.duration, this.props.checkedEventTypes, updatedPriceRange);
  }

  render() {
    // Start Date Minimum value
    let startDateMinValue = dateToString(this.props.durationStartDateMin, true);

    // Create correctly formatted start date for selector
    let startDateValue = dateToString(stringToDate(this.props.duration.startTime, false), true);

    // Create correctly formatted end date for selector
    let endDateValue = dateToString(stringToDate(this.props.duration.endTime, false), true);

    let eventTypes: JSX.Element[] = [];
    for (const eventType of Object.values(WtmEventType)) {
      let index = this.props.checkedEventTypes.indexOf(wtmEventTypeKeyToValue(eventType));

      if (index === -1) {
        eventTypes.push(
          <button key={eventType} className="unselected" onClick={() => this.onEventTypeCheck(eventType.toString())}>{eventType}</button>
        );

      } else {
        eventTypes.push(
          <button key={eventType} id={eventType.toString().toLowerCase()} className="selected" onClick={() => this.onEventTypeCheck(eventType.toString())}>{eventType}</button>
        );
        console.log(eventType.toString().toLowerCase())
      }
    }

    return (
      <div id="filter">
        <div id="filterNav">
          <button id="filterControl" onClick={this.props.onCollapse}>
            <img src={require('./img/x.png')} alt={"Collapse Filter Panel"}></img>
          </button>
        </div>

        <div id="duration">
          <h4>Date Range</h4>
          <div id="startDate">
            <label>Start date:</label>
            <input type="datetime-local" id="start" name="duration-start" value={startDateValue} min={startDateMinValue} max={DURATION_END_DATE_MAX} onChange={this.onStartDateSelection}/>
          </div>
          <div>
            <label>End date:</label>
            <input type="datetime-local" id="end" name="duration-end" value={endDateValue} min={startDateValue} max={DURATION_END_DATE_MAX} onChange={this.onEndDateSelection}/>
          </div>
        </div>

        <hr className="solid"/>

        <div>
          <h4>Type of Event</h4>
          <div>
            <div className="eventButtons">{eventTypes.slice(0,3)}</div>
            <div className="eventButtons">{eventTypes.slice(3,6)}</div>
            <div className="eventButtons">{eventTypes.slice(6,7)}</div>
          </div>
        </div>

        <hr className="solid"/>

        <div>
          <h4>Cost</h4>
          <div id="price">
            <input type="range" name="price-range" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} value={this.props.priceRange.max} step="1" onChange={this.onPriceRangeUpdate}/>
            <p>{this.props.priceRange.max}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;