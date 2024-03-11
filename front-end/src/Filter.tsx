import "./Filter.css";

import { ChangeEvent, Component } from "react";
import { WtmEventType, Duration, PriceRange, wtmEventTypeKeytoValue } from "./wtmEvent";
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

interface FilterState {
  /** WtmEventType filters. Default is all. */
  eventTypes: JSX.Element[];
}

/**
 * The Map sidebar that allows the user to select different WtmEvent filters.
 */
class Filter extends Component<FilterProps, FilterState>  {
  constructor(props: any) {
    super(props);
    console.log("here: " + this.props.checkedEventTypes);

    let eventTypes: JSX.Element[] = [];
    for (const eventType of Object.values(WtmEventType)) {
      // only leave the appropriate ones checked
      // TODO: not right
      let index = this.props.checkedEventTypes.indexOf(wtmEventTypeKeytoValue(eventType));
      console.log(index)

      if (index === -1) {
        eventTypes.push(
          <div key={eventType}>
            <input key={eventType} type="checkbox" id={eventType.toString()} value={eventType} onChange={this.onEventTypeCheck}/>
            <label>{eventType}</label>
          </div>
        );

        // eventTypes.push(
        //   <button id={eventType} onClick={this.onEventButtonClick}>
        //       <img src={require('./img/' + 'filter_panel_control.png')} alt={"Collapse Filter Panel"}></img>
        //   </button>
        // );
      } else {
        eventTypes.push(
          <div key={eventType}>
            <input key={eventType} type="checkbox" id={eventType.toString()} value={eventType} onChange={this.onEventTypeCheck} defaultChecked/>
            <label>{eventType}</label>
          </div>
        );
      }
    }

    this.state = {
      eventTypes: eventTypes,
    };
  }

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
  onEventTypeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedChecked = this.props.checkedEventTypes;

    let enumVal: WtmEventType = wtmEventTypeKeytoValue(event.target.value);
    let index = updatedChecked.indexOf(enumVal);
    // Not found, so need to "check" by adding to currChecked
    if (index === -1) {
      updatedChecked.push(enumVal);

    // Found, so need to "uncheck" by removing from currChecked
    } else {
      updatedChecked.splice(index, 1);
    }
    console.log(updatedChecked)

    this.props.onChange(this.props.duration, updatedChecked, this.props.priceRange);
  }

  /**
   * Updates currChecked with new status of the eventType, event.
   * @param event data of the (un)checked eventType
   */
  onEventButtonClick = () => {
    // TODO
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

    return (
      <div id="filter">
        <div id="filterNav">
          <button id="filterControl" onClick={this.props.onCollapse}>
            <img src={require('./img/filter_panel_control.png')} alt={"Collapse Filter Panel"}></img>
          </button>
        </div>

        <div id="duration">
          <h4>Date Range</h4>
          <div>
            <label>Start date:</label>
            <input type="datetime-local" id="start" name="duration-start" value={startDateValue} min={startDateMinValue} max={DURATION_END_DATE_MAX} onChange={this.onStartDateSelection}/>
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

        <div>
          <h4>Cost</h4>
          {/** TODO: Make pop-up value!!! */}
          <input type="range" id="price" name="price-range" min={PRICE_RANGE_MIN} max={PRICE_RANGE_MAX} value={this.props.priceRange.max} step="1" onChange={this.onPriceRangeUpdate}/>
        </div>
      </div>
    );
  }
}

export default Filter;