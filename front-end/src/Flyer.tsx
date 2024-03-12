import React, { useEffect } from 'react';
import { AddGCal } from './AddGCal'
import { Duration, WtmEvent } from './wtmEvent';
import { URL_BASE } from './constants';
import './Flyer.css'

interface FlyerProps {
  // Event to display (get flyer img & text for)
  event: WtmEvent,
  // Return to main Map view page
  onClose: () => void,
  // Trigger App to display server error page
  doError: (msg: string) => void;
}

/**
 * Flyer component containing flyer image, buttons to interact with
 * event, and longer text description of flyer
 */
const Flyer = (props: FlyerProps) => {
  /** Save event to server on save button click */
  const saveEvent = () => {
    fetch(URL_BASE + "/saveEvent?id=" + encodeURIComponent(props.event.eventId))
      .then(doSavedResp)
      .catch(() => props.doError("Failed to connect to server."));
  }

  /** Validate success in saving event in server */
  const doSavedResp = (res: Response): void => {
    if (res.status === 200) {
      // TODO: configure some nice confirmation popup text
    } else if (res.status === 400) {
      res.text().then(props.doError)
         .catch(() => props.doError("400 response from /flyer/ without error"));
    } else {
      props.doError(`/flyer/ returned status code ${res.status}`);
    }
  };

  /** Formats the date header for events: "Weekday, day Month startTime{am/pm} - endTime{am/pm}" */
  const formatDate = (duration: Duration): string => {
    const [date, startTime] = duration.startTime.split(" ");
    const [_, endTime] = duration.endTime.split(" ");

    const [year, month, day] = date.split("-");
    let dateObj: Date = new Date();
    dateObj.setFullYear(Number(year), Number(month) - 1, Number(day));

    // Format start and end times from 
    const startHour = startTime.slice(0, 2);
    const startTimeFormatted: string = (Number(startHour) > 12) 
      ? (Number(startHour) - 12) + ":" + startTime.slice(3, 5) + "pm"
      : startTime.slice(0, 5) + "am";

    const endHour = endTime.slice(0, 2);
    const endTimeFormatted: string = (Number(endHour) > 12) 
      ? (Number(endHour) - 12) + ":" + endTime.slice(3, 5) + "pm"
      : endTime.slice(0, 5) + "am"

    return dateObj.toLocaleString('default', {weekday: 'long'}) + ", " + 
      dateObj.toLocaleString('default', { month: 'long' }) + " " + 
      day + "\n" + startTimeFormatted + " - " + endTimeFormatted;
  }

  return (
    <div id="flyer">
      <button id="flyer-x" onClick={props.onClose}><img src={require('./img/x.png')} alt={"Close Flyer View"}></img></button>

      {/* TODO: somehow handle the fact that this could be an invalid image 
        if there isn't one in the server for this event id */}
      <img id="flyer-img" src={URL_BASE + `/flyer/${props.event.eventId}.png`}  
        alt={props.event.name + " flyer image"} title={props.event.name + " flyer image"}></img>

      <div id="flyer-buttons">
        <img className="flyer-button" src={require('./img/save-icon.png')}
          title={"Save event"} alt={"Save event icon"} 
          onClick={saveEvent}></img>

        <AddGCal event={props.event}></AddGCal>
      </div>

      {/* All the flyer information: */}
      <div id="flyer-info">
        <div id="info-row">
          <div> {/* First col: date, time and cost */}
            <div className="info-item">
              <img className="flyer-info-icon" src={require('./img/time.png')} alt={"Clock icon"}></img>
              <p>{formatDate(props.event.duration)}</p>
            </div>
            <div className="info-item">
              <img className="flyer-info-icon" src={require('./img/dollar.png')} alt={"Dollar sign icon"}></img>
              <p>{props.event.cost === 0 ? "Free!" : "$" + props.event.cost}</p>
            </div>
          </div>
          <div> {/* Second col: location & URL */}
            <div className="info-item">
              <img className="flyer-info-icon" src={require('./img/' + props.event.eventType.toLocaleLowerCase() + '_pin.png')} alt={props.event.eventType + " pin icon"}></img>
              <p>{props.event.location}</p>
            </div>
            {props.event.url ?
              <div className="info-item">
                <img className="flyer-info-icon" src={require('./img/link.png')} alt={"Info 'i' icon"}></img>
                <a href={"https://" + props.event.url} target="_blank">{props.event.url}</a>
              </div>
              : <></>
            }
          </div>
        </div>

        {props.event.eventDetails ?
          <div className="info-item">
            <img className="flyer-info-icon" src={require('./img/info.png')}></img>
            <p>{props.event.eventDetails}</p>
          </div>
          : <></>
        }
      </div>
    </div>
  );
};

export default Flyer;