/**
 * Translates the given date to a string in format "YYYY-MM-DD hh:mm" or 
 * "YYYY-MM-DDThh:mm". Duration strings do not have a tSplit whereas 
 * filter widget strings do.
 * @param date date to format
 * @param tSplit indicates the date format between the date and time
 * @returns given date as a string in format "YYYY-MM-DDThh:mm" if tSplit
 *          otherwise "YYYY-MM-DD hh:mm"
 */
export const dateToString = (date: Date, tSplit: boolean): string => {
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
  str = str + day.toString();

  if (tSplit) {
    str = str + "T";
  } else {
    str = str + " ";
  }

  let hours = date.getHours();
  if (hours < 10) {
    str = str + "0";
  }
  str = str + hours.toString() + ":";

  let mins = date.getMinutes();
  if (mins < 10) {
    str = str + "0";
  }
  str = str + mins.toString();

  if (!tSplit) {
    str = str + ":00";
  }
  return str;
};

/**
 * Translates the given date string to a Date type/object. Duration strings
 * do not have a tSplit whereas filter widget strings do.
 * @param dateStr date to format
 * @param tSplit indicates the date format between the date and time
 * @requires dateStr in format "YYYY-MM-DD hh:mm" or "YYYY-MM-DDThh:mm"
 * @returns given date as a Date type/object
 */
export const stringToDate = (dateStr: string, tSplit: boolean): Date => {
  let dateTimeParts: string[] = []
  if (tSplit) {
    dateTimeParts = dateStr.split("T");
  } else {
    dateTimeParts = dateStr.split(" ");
  }

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
};
